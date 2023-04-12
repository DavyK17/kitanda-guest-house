/* IMPORTS */
import countryData from "../../util/countryData";
import phoneRegex from "../../util/phoneRegex";

/* COMPONENT */
const Register = props => {
    // Destructure props
    const { toggleHasAccount, handleSubmit } = props;

    // Render list of countries
    const renderCountries = () => countryData.map(({ code, name }, i) => <option key={i} value={code}>{name}</option>);

    // Return component
    return (
        <form className="auth-form" id="register" onSubmit={handleSubmit}>
            <legend>Sign up</legend>

            <fieldset id="guest-details">
                <div className="label-input" id="form-title">
                    <label htmlFor="customer-title">Title</label>
                    <input type="text" id="customer-title" name="customer-title" placeholder="Mr. / Mrs. / etc." />
                </div>
                <div className="label-input" id="form-first">
                    <label htmlFor="customer-first">First name*</label>
                    <input type="text" id="customer-first" name="customer-first" placeholder="Given name(s)" required />
                </div>
                <div className="label-input" id="form-last">
                    <label htmlFor="customer-last">Last name*</label>
                    <input type="text" id="customer-last" name="customer-last" placeholder="Surname" required />
                </div>
                <div className="label-input" id="form-company">
                    <label htmlFor="customer-company">Company name</label>
                    <input type="text" id="customer-company" name="customer-company" placeholder="Company name" />
                </div>
                <div className="label-input" id="form-address-1">
                    <label htmlFor="customer-add-1">Address 1*</label>
                    <input type="text" id="customer-add-1" name="customer-add-1" placeholder="House number and street name" required />
                </div>
                <div className="label-input" id="form-address-2">
                    <label htmlFor="customer-add-2">Address 2</label>
                    <input type="text" id="customer-add-2" name="customer-add-2" placeholder="Apartment, suite, unit, etc." />
                </div>
                <div className="label-input" id="form-city">
                    <label htmlFor="customer-city">Town/city*</label>
                    <input type="text" id="customer-city" name="customer-city" required />
                </div>
                <div className="label-input" id="form-county">
                    <label htmlFor="customer-county">County/State/Province</label>
                    <input type="text" id="customer-county" name="customer-county" />
                </div>
                <div className="label-input" id="form-postcode">
                    <label htmlFor="customer-postcode">Postcode/ZIP*</label>
                    <input type="text" id="customer-postcode" name="customer-postcode" required />
                </div>
                <div className="label-input" id="form-country">
                    <label htmlFor="customer-country">Country*</label>
                    <select id="customer-country" name="customer-country" required defaultValue={"KE"}>
                        {renderCountries()}
                    </select>
                </div>
                <div className="label-input" id="form-phone">
                    <label htmlFor="customer-phone">Phone number</label>
                    <input type="tel" id="customer-phone" name="customer-phone" pattern={phoneRegex.toString().replaceAll("/", "")} placeholder="i.e. 254XXXXXXXXX" />
                </div>
                <div className="label-input" id="form-email">
                    <label htmlFor="customer-email">Email address*</label>
                    <input type="email" id="customer-email" name="customer-email" placeholder="name@example.com" required />
                </div>
                <div className="label-input" id="form-password">
                    <label htmlFor="customer-password">Password*</label>
                    <input type="password" id="customer-password" placeholder="Password" required />
                </div>
                <div className="label-input" id="form-confirm-password">
                    <label htmlFor="customer-confirm-password">Confirm password*</label>
                    <input type="password" id="customer-confirm-password" placeholder="Confirm password" required />
                </div>
            </fieldset>

            <fieldset id="form-end">
                <button type="submit" className="font-head-2 bold uppercase">Submit</button>
                <button className="font-head-2 bold uppercase" onClick={toggleHasAccount}>Sign in instead</button>
            </fieldset>

            <p id="status"></p>
        </form>
    )
}

/* EXPORT */
export default Register;