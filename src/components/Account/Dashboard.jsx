/* IMPORTS */
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import capitalise from "../../util/capitalise";

/* COMPONENT */
const Dashboard = props => {
    // Destructure props and define useNavigate()
    const { account, isLoading, error, handleUnlink, handleSignOut, handleDelete } = props;
    let navigate = useNavigate();

    // Return error message if error
    if (error) return <p className="error">An error occurred loading your dashboard. Kindly refresh the page and try again.</p>;

    // Return skeleton if loading
    if (isLoading) return <Skeleton containerClassName="skeleton-container" containerTestId="account-dashboard-loading" />;

    // Return account details if fetched
    if (account) {
        // Destructure account details
        const { id, title, firstName, lastName, companyName, phone, email, federatedCredentials } = account;

        // List all providers of user's third-party credentials
        const providers = federatedCredentials.map(credential => credential.provider);

        // Define function to return third-party link/unlink buttons
        const renderThirdPartyButton = provider => {
            let path = `/api/auth/login/${provider}`;
            let title = providers.includes(provider) ? `Unlink ${capitalise(provider)} account` : `Link ${capitalise(provider)} account`;
            let text = providers.includes(provider) ? `Unlink from ${capitalise(provider)}` : `Link to ${capitalise(provider)}`;

            return providers.includes(provider) ?
                <button className="link" title={title} data-provider={provider} onClick={handleUnlink}>{text}</button> :
                <a href={path} title={title} data-provider={provider}>{text}</a>;
        }

        // Return account dashboard
        return <div className="dashboard">
            <h2 className="visually-hidden">Dashboard</h2>
            <div className="user-id" data-testid="account-id">
                <h3 className="font-head-2 bold uppercase">User ID</h3>
                <p className="font-head">{id}</p>
            </div>
            <div className="names" data-testid="account-names">
                <h3 className="font-head-2 bold uppercase">Name</h3>
                <p>{title} {firstName} {lastName}</p>
            </div>
            {
                !companyName ? null : <div className="company-name" data-testid="account-company-name">
                    <h3 className="font-head-2 bold uppercase">Company name</h3>
                    <p>{companyName}</p>
                </div>
            }
            {
                !phone ? null : <div className="phone" data-testid="account-phone">
                    <h3 className="font-head-2 bold uppercase">Phone number</h3>
                    <p>{phone}</p>
                </div>
            }
            <div className="email" data-testid="account-email">
                <h3 className="font-head-2 bold uppercase">Email address</h3>
                <p>{email}</p>
            </div>
            <div className="third-party" data-testid="account-third-party">
                <h3 className="font-head-2 bold uppercase">Third-party providers</h3>
                <div className="providers">
                    {renderThirdPartyButton("facebook")}
                    {renderThirdPartyButton("google")}
                </div>
            </div>
            <div className="buttons">
                <button className="font-head-2 bold uppercase" onClick={() => navigate("/account/addresses")}>Manage addresses</button>
                <button className="font-head-2 bold uppercase" onClick={() => navigate("/account/reservations")}>View reservations</button>
            </div>
            <div className="buttons">
                <button className="font-head-2 bold uppercase" onClick={() => navigate("/account/details")}>Edit details</button>
                <button className="font-head-2 bold uppercase" onClick={handleSignOut}>Sign out</button>
            </div>
            <div className="buttons">
                <button className="font-head-2 bold uppercase" onClick={handleDelete}>Delete account</button>
            </div>
        </div>
    }
}

/* EXPORT */
export default Dashboard;