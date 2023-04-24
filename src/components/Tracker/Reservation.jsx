/* IMPORTS */
import capitalise from "../../util/capitalise";
import phoneRegex from "../../util/phoneRegex";
import renderTime from "../../util/renderTime";

/* COMPONENT */
const Reservation = props => {
    // Destructure props and details
    const { details, phone, handleCancel, toggleConfirm, handleConfirm } = props;
    const { id, checkInDate, checkOutDate, totalPrice, rooms, createdAt, status } = details;

    // Return component
    return <div className="reservation">
        <div className="header">
            <p className="check-in">
                <span className="font-head-2 semi-bold uppercase">Checking in:&nbsp;</span>
                <span className="font-head-2 light uppercase" id={`reservation-${id}-check-in-date`}>{renderTime(checkInDate, true)}</span>
            </p>
            <p className="check-out">
                <span className="font-head-2 semi-bold uppercase">Checking out:&nbsp;</span>
                <span className="font-head-2 light uppercase" id={`reservation-${id}-check-out-date`}>{renderTime(checkOutDate, true)}</span>
            </p>
        </div>
        <div className="body">
            <div className="info">
                <div className="id">
                    <h3 className="font-head-2 bold uppercase">Reservation ID</h3>
                    <p>{id}</p>
                </div>
                <div className="price">
                    <h3 className="font-head-2 bold uppercase">Total price</h3>
                    <p>Ksh. {totalPrice.toLocaleString("en-KE")}</p>
                </div>
                <div className="created-at">
                    <h3 className="font-head-2 bold uppercase">Created at</h3>
                    <p>{renderTime(createdAt)}</p>
                </div>
            </div>
            <div className="rooms">
                <h3 className="font-head-2 bold uppercase">Rooms</h3>
                <ul>{rooms.map(({ roomNumber, roomTypeName }) => <li>{roomNumber} ({roomTypeName})</li>)}</ul>
            </div>
        </div>
        <div className="footer">
            <p className="status font-head-2 semi-bold uppercase" id={`reservation-${id}-status`}>{capitalise(status)}</p>
            {
                status !== "pending" ? null : <div className="buttons">
                    <button id="cancel" className="font-head-2 semi-bold uppercase" onClick={handleCancel} aria-label="Cancel reservation">Cancel</button>
                    <button id="confirm" className="font-head-2 semi-bold uppercase" onClick={toggleConfirm} aria-label="Confirm reservation">Confirm</button>
                </div>
            }
        </div>
        <form className="payment" id={`reservation-${id}-payment`} onSubmit={handleConfirm}>
            <div className="input">
                <label className="font-head-2 semi-bold uppercase" htmlFor="phone">M-Pesa number</label>
                <input type="tel" id="phone" placeholder="i.e. 254XXXXXXXXX" pattern={phoneRegex.toString().replaceAll("/", "")} defaultValue={phone} required />
            </div>
            <button type="submit" className="font-head-2 semi-bold uppercase">Pay</button>
        </form>
    </div>
}

/* EXPORT */
export default Reservation;