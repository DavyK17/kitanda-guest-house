/* IMPORTS */
import renderTime from "../../util/renderTime";

/* COMPONENT */
const Address = props => {
    // Destructure props and details
    const { address, handleEdit, handleDelete } = props;
    const { id, address1, address2, townCity, countyStateProvince, postcodeZip, country, createdAt } = address;

    // Return component
    return <div className="address">
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
            <button className="font-head-2 bold uppercase" onClick={handleEdit}>Edit</button>
            <button className="font-head-2 bold uppercase" onClick={handleDelete}>Delete</button>
        </div>
    </div>
}

/* EXPORT */
export default Address;