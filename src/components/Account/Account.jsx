/* IMPORTS */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Addresses from "./Addresses";
import Dashboard from "./Dashboard";
import Details from "./Details";
import Reservations from "./Reservations";

import { logout } from "../../api/Auth";
import { getUser, updateUser, deleteUser, unlinkThirdParty } from "../../api/Account";
import { getAddresses } from "../../api/Addresses";
import { getReservations } from "../../api/Reservations";

import capitalise from "../../util/capitalise";
import displayErrorMessage from "../../util/displayErrorMessage";

/* COMPONENT */
const Account = props => {
	// Destructure props
	const { view, user, setUser } = props;

	// Define status and useNavigate()
	const status = document.getElementById("status");
	let navigate = useNavigate();

	// Redirect to authentication if not authenticated
	useEffect(() => {
		if (!user) navigate("/auth");
		// eslint-disable-next-line
	}, [user]);

	/* STATE */
	// Loading
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	// Account
	const [account, setAccount] = useState();
	const [addresses, setAddresses] = useState([]);
	const [reservations, setReservations] = useState([]);
	const fetchAccount = async () => {
		setIsLoading(true);

		try {
			let data = await getUser();
			if (data) {
				setAccount(data);
				data = await getAddresses();
				if (data.length > 0) {
					setAddresses(data);
					data = await getReservations();
					if (data.length > 0) setReservations(data);
				}
			}
		} catch (err) {
			console.error(err);
			setError(true);
		}

		setIsLoading(false);
	}

	useEffect(() => {
		fetchAccount();
	}, []);

	/* FUNCTIONS */
	// Edit account details
	const editDetails = async e => {
		e.preventDefault();

		const currentPassword = e.target[7].value;
		const newPassword = e.target[8].value;
		const confirmNewPassword = e.target[9].value;

		if (!currentPassword && newPassword && confirmNewPassword) return status.textContent = "No current password provided.";
		if (currentPassword) {
			if (newPassword && !confirmNewPassword) return status.textContent = "Kindly confirm your new password.";
			if (!newPassword || !confirmNewPassword) return status.textContent = "No new password provided.";
			if (newPassword !== confirmNewPassword) return status.textContent = "New passwords do not match.";
		}

		const title = e.target[1].value;
		const firstName = e.target[2].value;
		const lastName = e.target[3].value;
		const companyName = e.target[4].value;
		const phone = e.target[5].value;
		const email = e.target[6].value;

		status.textContent = "Updating details…";
		let response = await updateUser(title, firstName, lastName, companyName, phone, email, currentPassword, newPassword, confirmNewPassword);
		if (response !== "Account updated successfully") return displayErrorMessage(response);

		status.textContent = null;
		navigate("/account/dashboard");
		fetchAccount();
	}

	// Unlink third-party provider
	const unlink = async e => {
		e.preventDefault();
		const { provider } = e.target.dataset;

		status.textContent = `Unlinking from ${capitalise(provider)}…`;
		let response = await unlinkThirdParty(provider);
		if (typeof response === "string") return displayErrorMessage(response);

		status.textContent = null;
		fetchAccount();
	}

	// Sign out
	const signOut = async e => {
		e.preventDefault();

		status.textContent = "Signing out…";
		let response = await logout();
		if (response !== "Logout successful") return displayErrorMessage(response);

		status.textContent = null;
		setUser(null);
		navigate("/");
	}

	// Delete account
	const deleteAccount = async e => {
		e.preventDefault();

		status.textContent = "Deleting account…";
		let response = await deleteUser();
		if (typeof response === "string") return displayErrorMessage(response);

		status.textContent = "Account deleted successfully";
		setTimeout(() => {
			setUser(null);
			navigate("/");
			status.textContent = null;
		}, 3000);
	}

	// Define function to render appropriate element
	const renderView = (view) => {
		switch (view) {
			case "addresses":
				return <Addresses list={addresses} fetchAccount={fetchAccount} isLoading={isLoading} error={error} />;
			case "dashboard":
			default:
				return <Dashboard account={account} isLoading={isLoading} error={error} handleUnlink={unlink} handleSignOut={signOut} handleDelete={deleteAccount} />;
			case "details":
				return <Details account={account} isLoading={isLoading} error={error} handleSubmit={editDetails} />;
			case "reservations":
				return <Reservations account={account} fetchAccount={fetchAccount} list={reservations} isLoading={isLoading} error={error} />;
		}
	}

	// Return component
	return (
		<>
			<section id="account-top">
				<div className="background black">
					<h1 className="bold uppercase">Account</h1>
					<p>Manage your user account.</p>
				</div>
			</section>
			<section id="account-main">
				<div className="content align-items-start">
					{renderView(view)}
					<p id="status" data-testid="status"></p>
				</div>
			</section>
		</>
	);
};

/* EXPORT */
export default Account;
