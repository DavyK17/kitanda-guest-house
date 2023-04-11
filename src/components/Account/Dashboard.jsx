/* IMPORTS */
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { getUser } from "../../api/Account";

import capitalise from "../../util/capitalise";

/* COMPONENT */
const Dashboard = () => {
    // Define useNavigate()
    let navigate = useNavigate();

    /* STATE + FUNCTIONS */
    // Loading
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Account
    const [account, setAccount] = useState();
    const fetchAccount = async () => {
        setIsLoading(true);

        try {
            let data = await getUser();
            if (data) setAccount(data);
        } catch (err) {
            console.error(err);
            setError(true);
        }

        setIsLoading(false);
    }

    useMemo(() => {
        fetchAccount();
    }, []);

    // Render body
    const renderBody = () => {
        // Return error message if error
        if (error) return <p className="error">An error occurred loading your account details. Kindly refresh the page and try again.</p>;

        // Return skeleton if loading
        if (isLoading) return <Skeleton containerTestId="account-loading" />;

        // Return account details if fetched
        if (account) {
            // Destructure account details
            const { id, firstName, lastName, phone, email, federatedCredentials } = account;

            // List all providers of user's third-party credentials
            const providers = federatedCredentials.map(credential => credential.provider);

            // Define function to return third-party link/unlink buttons
            const renderThirdPartyButton = provider => {
                let path = `/api/auth/login/${provider}`;
                let title = providers.includes(provider) ? `Unlink ${capitalise(provider)} account` : `Link ${capitalise(provider)} account`;
                let text = providers.includes(provider) ? `Unlink from ${capitalise(provider)}` : `Link to ${capitalise(provider)}`;

                const unlink = async e => {
                    e.preventDefault();
                }

                return providers.includes(provider) ? <button title={title} onClick={unlink}>{text}</button> : <a href={path} title={title}>{text}</a>;
            }


            return <div className="account-dashboard">
                <div className="user-id" data-testid="account-id">
                    <h3 className="font-head-2 bold uppercase">User ID</h3>
                    <p className="font-head">{id}</p>
                </div>
                <div className="names" data-testid="account-names">
                    <h3 className="font-head-2 bold uppercase">Name</h3>
                    <p>{firstName} {lastName}</p>
                </div>
                <div className="phone" data-testid="account-phone">
                    <h3 className="font-head-2 bold uppercase">Phone number</h3>
                    <p>{phone}</p>
                </div>
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
                    <button class="font-head-2 bold uppercase" onClick={() => navigate("/account/details")}>Edit details</button>
                    <button class="font-head-2 bold uppercase">Sign out</button>
                    <button class="font-head-2 bold uppercase">Delete account</button>
                </div>
            </div>
        }
    }

    // Return user details
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
                    {renderBody()}
                </div>
            </section>
        </>
    );
}

/* EXPORT */
export default Dashboard;