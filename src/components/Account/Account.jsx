/* IMPORTS */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Addresses from "./Addresses";
import Dashboard from "./Dashboard";
import Details from "./Details";

/* COMPONENT */
const Account = (props) => {
	// Destructure props and define useNavigate
    const { view, user, setUser } = props;
    let navigate = useNavigate();

    // Redirect to authentication if not authenticated
    useEffect(() => {
        if (!user) navigate("/auth");
        // eslint-disable-next-line
    }, [user]);
    
    // Define function to edit account details
    const editDetails = e => {
        e.preventDefault();
        console.log(e);
    }

	// Define function to render appropriate element
	const renderView = (view) => {
		switch (view) {
			case "addresses":
                return <Addresses />;
            case "details":
                return <Details handleSubmit={editDetails} />
			case "dashboard":
			default:
				return <Dashboard setUser={setUser} />;
		}
    };
    
    // Return component
	return (
		<>
			<section id="auth-top">
				<div className="background black">
					<h1 className="bold uppercase">Account</h1>
					<p>Manage your user account.</p>
				</div>
			</section>
			<section id="auth-main">
				<div className="content align-items-start">
					{renderView(view)}
					<p id="status"></p>
				</div>
			</section>
		</>
	);
};

/* EXPORT */
export default Account;
