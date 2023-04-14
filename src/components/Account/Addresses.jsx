/* IMPORTS */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import EditAddress from "./EditAddress";

import { createAddress, updateAddress, deleteAddress } from "../../api/Addresses";
import displayErrorMessage from "../../util/displayErrorMessage";
import renderTime from "../../util/renderTime";

/* COMPONENT */
const Addresses = props => {
    // Destructure props
    const { list, fetchAccount, isLoading, error } = props;

    // Define status and useNavigate()
    const status = document.getElementById("status");
    let navigate = useNavigate();

    // Edit address state
    const [editProps, setEditProps] = useState(null);

    // Return error message if error
    if (error) return <p className="error">An error occurred loading your addresses. Kindly refresh the page and try again.</p>;

    // Return skeleton if loading
    if (isLoading) return <Skeleton containerClassName="skeleton-container" containerTestId="account-addresses-loading" />;

    // Return addresses if fetched
    if (list.length > 0) {
        // Define function to render addresses
        const renderAddresses = () => list.map(({ id, address1, address2, townCity, countyStateProvince, postcodeZip, country, createdAt }, i) => {
            // Define function to edit address
            const handleEdit = async e => {
                e.preventDefault();

                const newAddress1 = e.target[1].value;
                const newAddress2 = e.target[2].value;
                const newTownCity = e.target[3].value;
                const newCountyStateProvince = e.target[4].value;
                const newPostcodeZip = e.target[5].value;
                const newCountry = e.target[6].value;

                status.textContent = "Updating address…";
                let response = await updateAddress(id, newAddress1, newAddress2, newTownCity, newCountyStateProvince, newPostcodeZip, newCountry);
                if (!response.includes("Address updated")) return displayErrorMessage(response);

                status.textContent = null;
                setEditProps(null);
                fetchAccount();
            }

            // Define function to show edit component
            const showEditAddress = e => {
                e.preventDefault();

                const props = {
                    operation: "edit",
                    address: { address1, address2, townCity, countyStateProvince, postcodeZip, country },
                    setEditProps,
                    handleSubmit: handleEdit
                }

                setEditProps(props);
            }

            // Define function to delete address
            const handleDelete = async e => {
                e.preventDefault();

                status.textContent = "Deleting address…";
                let response = await deleteAddress(id);
                if (typeof response === "string") return displayErrorMessage(response);

                status.textContent = null;
                fetchAccount();
            }

            // Return address
            return <div className="address" key={i}>
                <div className="details" data-testid="address-details">
                    <h3 className="font-head-2 bold uppercase">Address</h3>
                    <p className="font-head">{address1}</p>
                    <p className="font-head">{address2}</p>
                    <p className="font-head">{townCity}</p>
                    <p className="font-head">{countyStateProvince}</p>
                    <p className="font-head">{postcodeZip}</p>
                    <p className="font-head">{country}</p>
                </div>
                <div className="info" data-testid="address-info">
                    <h3 className="font-head-2 bold uppercase">Information</h3>
                    <p className="font-head">ID: {id}</p>
                    <p className="font-head">Created on {renderTime(createdAt)}</p>
                </div>
                <div className="buttons">
                    <button className="font-head-2 bold uppercase" onClick={showEditAddress}>Edit</button>
                    <button className="font-head-2 bold uppercase" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        });

        // Define function to create address
        const handleCreate = async e => {
            e.preventDefault();

            const address1 = e.target[1].value;
            const address2 = e.target[2].value;
            const townCity = e.target[3].value;
            const countyStateProvince = e.target[4].value;
            const postcodeZip = e.target[5].value;
            const country = e.target[6].value;

            status.textContent = "Creating address…";
            let response = await createAddress(address1, address2, townCity, countyStateProvince, postcodeZip, country);
            if (!response.includes("Address created")) return displayErrorMessage(response);

            status.textContent = null;
            setEditProps(null);
            fetchAccount();
        }

        // Define function to show create component
        const showCreateAddress = e => {
            e.preventDefault();

            const props = {
                operation: "create",
                address: {},
                setEditProps,
                handleSubmit: handleCreate
            }

            setEditProps(props);
        }

        // Return edit address component if props present
        if (editProps) return <EditAddress {...editProps} />;

        // Return component
        return (
            <div className="addresses">
                <h2 className="font-head-2 bold uppercase">Manage addresses</h2>
                <div className="list">
                    {renderAddresses()}
                </div>
                <div className="buttons">
                    <button className="font-head-2 bold uppercase" onClick={showCreateAddress}>New address</button>
                    <button className="font-head-2 bold uppercase" onClick={() => navigate("/account/dashboard")}>Back to dashboard</button>
                </div>
            </div>
        )
    }
}

/* EXPORT */
export default Addresses;