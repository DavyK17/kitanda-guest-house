/* IMPORTS */
import Skeleton from "react-loading-skeleton";

import Address from "./Address";
import EditAddress from "./EditAddress";

import { updateAddress, deleteAddress } from "../../api/Addresses";
import displayErrorMessage from "../../util/displayErrorMessage";

/* COMPONENT */
const Addresses = props => {
    // Destructure props and define status
    const { list, fetchAccount, isLoading, error, editProps, setEditProps, handleNew, handleBack } = props;
    const status = document.getElementById("status");

    // Return error message if error
    if (error) return <p className="error">An error occurred loading your addresses. Kindly refresh the page and try again.</p>;

    // Return skeleton if loading
    if (isLoading) return <Skeleton containerClassName="skeleton-container" containerTestId="account-addresses-loading" />;

    // Return addresses if fetched
    if (list.length > 0) {
        // Define function to render addresses
        const renderAddresses = () => list.map(({ id, address1, address2, townCity, countyStateProvince, postcodeZip, country, createdAt }, i) => {
            // Define function to go back to addresses
            const backToAddresses = e => {
                e.preventDefault();
                setEditProps(null);
            }

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
                    handleBack: backToAddresses,
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
            return <Address
                key={i}
                address={{ id, address1, address2, townCity, countyStateProvince, postcodeZip, country, createdAt }}
                handleEdit={showEditAddress}
                handleDelete={handleDelete}
            />
        });

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
                    <button className="font-head-2 bold uppercase" onClick={handleNew}>New address</button>
                    <button className="font-head-2 bold uppercase" onClick={handleBack}>Back to dashboard</button>
                </div>
            </div>
        )
    }
}

/* EXPORT */
export default Addresses;