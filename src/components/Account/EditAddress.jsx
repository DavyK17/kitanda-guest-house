/* IMPORTS */
import iso3311a2 from "iso-3166-1-alpha-2";

import capitalise from "../../util/capitalise";
import countryData from "../../util/countryData";

/* COMPONENT */
const EditAddress = props => {
    // Destructure props
    const { operation, address, setEditProps, handleSubmit } = props;

    // Render list of countries
    const renderCountries = () => countryData.map(({ code, name }, i) => <option key={i} value={code}>{name}</option>);

    // Destructure address
    const { address1, address2, townCity, countyStateProvince, postcodeZip, country } = address;

    // Return component
    return (
        <form className="account-form" id="address-edit" onSubmit={handleSubmit}>
            <legend>{capitalise(operation)} address</legend>

            <fieldset id="address-details">
                <div className="label-input" id="form-address-1">
                    <label htmlFor="customer-add-1">Address 1</label>
                    <input type="text" id="customer-add-1" name="customer-add-1" placeholder="House number and street name" defaultValue={address1} />
                </div>
                <div className="label-input" id="form-address-2">
                    <label htmlFor="customer-add-2">Address 2</label>
                    <input type="text" id="customer-add-2" name="customer-add-2" placeholder="Apartment, suite, unit, etc." defaultValue={address2} />
                </div>
                <div className="label-input" id="form-city">
                    <label htmlFor="customer-city">Town/city</label>
                    <input type="text" id="customer-city" name="customer-city" placeholder="Town/city" defaultValue={townCity} />
                </div>
                <div className="label-input" id="form-county">
                    <label htmlFor="customer-county">County/State/Province</label>
                    <input type="text" id="customer-county" name="customer-county" placeholder="County/State/Province" defaultValue={countyStateProvince} />
                </div>
                <div className="label-input" id="form-postcode">
                    <label htmlFor="customer-postcode">Postcode/ZIP</label>
                    <input type="text" id="customer-postcode" name="customer-postcode" placeholder="Postcode/ZIP" defaultValue={postcodeZip} />
                </div>
                <div className="label-input" id="form-country">
                    <label htmlFor="customer-country">Country</label>
                    <select id="customer-country" name="customer-country" defaultValue={iso3311a2.getCode(country || "Kenya")}>
                        {renderCountries()}
                    </select>
                </div>
            </fieldset>

            <fieldset id="form-end">
                <button type="submit" className="font-head-2 bold uppercase">Save address</button>
                <button className="font-head-2 bold uppercase" onClick={() => setEditProps(null)}>Back to addresses</button>
            </fieldset>
        </form>
    )

}

/* EXPORT */
export default EditAddress;