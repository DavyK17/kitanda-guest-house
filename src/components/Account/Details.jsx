/* IMPORTS */
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import phoneRegex from "../../util/phoneRegex";

/* COMPONENT */
const Details = props => {
    // Destructure props and define useNavigate()
    const { account, isLoading, error, handleSubmit } = props;
    let navigate = useNavigate();

    // Return error message if error
    if (error) return <p className="error">An error occurred loading your account details. Kindly refresh the page and try again.</p>;

    // Return skeleton if loading
    if (isLoading) return <Skeleton containerClassName="skeleton-container" containerTestId="account-details-loading" />;

    // Do the following if account details available
    if (account) {
        // Destructure account details
        const { title, firstName, lastName, companyName, phone, email } = account;

        // Return component
        return (
            <form className="account-form" id="details" onSubmit={handleSubmit}>
                <legend>Edit account details</legend>

                <fieldset id="guest-details">
                    <div className="label-input" id="form-title">
                        <label htmlFor="customer-title">Title</label>
                        <input type="text" id="customer-title" name="customer-title" placeholder="Mr. / Mrs. / etc." defaultValue={title} />
                    </div>
                    <div className="label-input" id="form-first">
                        <label htmlFor="customer-first">First name</label>
                        <input type="text" id="customer-first" name="customer-first" placeholder="Given name(s)" defaultValue={firstName} />
                    </div>
                    <div className="label-input" id="form-last">
                        <label htmlFor="customer-last">Last name</label>
                        <input type="text" id="customer-last" name="customer-last" placeholder="Surname" defaultValue={lastName} />
                    </div>
                    <div className="label-input" id="form-company">
                        <label htmlFor="customer-company">Company name</label>
                        <input type="text" id="customer-company" name="customer-company" placeholder="Company name" defaultValue={companyName} />
                    </div>
                    <div className="label-input" id="form-phone">
                        <label htmlFor="customer-phone">Phone number</label>
                        <input type="tel" id="customer-phone" name="customer-phone" pattern={phoneRegex.toString().replaceAll("/", "")} placeholder="i.e. 254XXXXXXXXX" defaultValue={phone} />
                    </div>
                    <div className="label-input" id="form-email">
                        <label htmlFor="customer-email">Email address</label>
                        <input type="email" id="customer-email" name="customer-email" placeholder="name@example.com" defaultValue={email} />
                    </div>
                    <div className="label-input" id="form-current-password">
                        <label htmlFor="customer-current-password">Current password</label>
                        <input type="password" id="customer-current-password" placeholder="Current password" />
                    </div>
                    <div className="label-input" id="form-new-password">
                        <label htmlFor="customer-password">New password</label>
                        <input type="password" id="customer-new-password" placeholder="Password" />
                    </div>
                    <div className="label-input" id="form-confirm-new-password">
                        <label htmlFor="customer-confirm-password">Confirm new password</label>
                        <input type="password" id="customer-confirm-new-password" placeholder="Confirm password" />
                    </div>
                </fieldset>

                <fieldset id="form-end">
                    <button type="submit" className="font-head-2 bold uppercase">Save details</button>
                    <button className="font-head-2 bold uppercase" onClick={() => navigate("/account/dashboard")}>Back to dashboard</button>
                </fieldset>
            </form>
        )
    }
}

/* EXPORT */
export default Details;