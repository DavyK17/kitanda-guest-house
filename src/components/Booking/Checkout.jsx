/* IMPORTS */
import iso3311a2 from "iso-3166-1-alpha-2";

import countryData from "../../util/countryData";
import phoneRegex from "../../util/phoneRegex";

/* COMPONENT */
const Checkout = props => {
    // Destructure props
    const { user, phone, setPhone, email, setEmail, addresses, handleSubmit } = props;

    // Render list of countries
    const renderCountries = () => countryData.map(({ code, name }, i) => <option key={i} value={code}>{name}</option>);

    // Render list of user's addresses
    const renderAddresses = () => addresses.map(({ id, address1, townCity, country }, i) => <option key={i} value={id}>{address1}, {townCity}, {country}</option>);

    // Define function to render address inputs
    const renderAddressInputs = () => {
        // Render form if user not authenticated
        if (!user) return <fieldset id="address-details" className="unauthenticated">
            <legend>Address</legend>

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
                <select id="customer-country" name="customer-country" defaultValue={iso3311a2.getCode("Kenya")} required>
                    {renderCountries()}
                </select>
            </div>
        </fieldset>

        // Render dropdown if user authenticated
        return <fieldset id="address-details" className="authenticated">
            <legend>Address</legend>

            <div className="label-input" id="form-address">
                <label htmlFor="customer-address">Address</label>
                <select id="customer-address" name="customer-address" required>
                    {renderAddresses()}
                </select>
            </div>
        </fieldset>
    }

    // Return component
    return (
        <div className="rooms" id="booking-checkout" data-testid="booking-checkout">
            <div className="content align-items-start">
                <h2 className="font-bold uppercase">Checkout</h2>
                <p className="checkout-mobile-links">
                    <a href="#booking-cart">Review booking below</a>
                </p>

                <form className="checkout-form" onSubmit={handleSubmit}>
                    <fieldset id="guest-details">
                        <legend>Guest details</legend>

                        <div className="label-input" id="form-phone">
                            <label htmlFor="customer-phone">Phone number*</label>
                            <input
                                type="tel"
                                id="customer-phone"
                                name="customer-phone"
                                pattern={phoneRegex.toString().replaceAll("/", "")}
                                placeholder="i.e. 254XXXXXXXXX"
                                defaultValue={phone}
                                onChange={({ target }) => setPhone(target.value)}
                                required
                            />
                        </div>
                        <div className="label-input" id="form-email">
                            <label htmlFor="customer-email">Email address*</label>
                            <input
                                type="email"
                                id="customer-email"
                                name="customer-email"
                                placeholder="name@example.com"
                                defaultValue={email}
                                onChange={({ target }) => setEmail(target.value)}
                                required
                            />
                        </div>
                    </fieldset>

                    {renderAddressInputs()}

                    <fieldset id="form-end">
                        <legend>Confirmation</legend>

                        <div className="label-input radio">
                            <input type="checkbox" id="agree" name="agree" value="agree" required />
                            <label htmlFor="agree">I have read and agreed to the Non-Existent Privacy Policy.</label>
                        </div>
                        <button type="submit" className="font-head-2 bold uppercase">Checkout</button>
                    </fieldset>

                    <p id="status" data-testid="status"></p>
                </form>
            </div>
        </div>
    )
}

/* EXPORT */
export default Checkout;