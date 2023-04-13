/* IMPORTS */
import countryData from "../../util/countryData";

/* COMPONENT */
const CTPR = props => {
    // Destructure props
    const { handleSubmit } = props;

    // Render list of countries
    const renderCountries = () => countryData.map(({ code, name }, i) => <option key={i} value={code}>{name}</option>);

    // Return form
    return (
        <form className="auth-form" id="ctpr" onSubmit={handleSubmit}>
            <legend>Confirm third-party registration</legend>

            <fieldset id="guest-details">
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
                    <input type="text" id="customer-city" name="customer-city" placeholder="Town/city" required />
                </div>
                <div className="label-input" id="form-county">
                    <label htmlFor="customer-county">County/State/Province</label>
                    <input type="text" id="customer-county" name="customer-county" placeholder="County/State/Province" />
                </div>
                <div className="label-input" id="form-postcode">
                    <label htmlFor="customer-postcode">Postcode/ZIP*</label>
                    <input type="text" id="customer-postcode" name="customer-postcode" placeholder="Postcode/ZIP" required />
                </div>
                <div className="label-input" id="form-country">
                    <label htmlFor="customer-country">Country*</label>
                    <select id="customer-country" name="customer-country" required defaultValue={"KE"}>
                        {renderCountries()}
                    </select>
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
            </fieldset>

            <p id="status"></p>
        </form>
    );
}

/* EXPORT */
export default CTPR;