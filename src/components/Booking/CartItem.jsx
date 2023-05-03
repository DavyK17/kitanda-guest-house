/* COMPONENT */
const CartItem = props => {
    // Destructure props and details
    const { details, handleRemove } = props;
    const { name, pricePerNight } = details;

    // Return component
    return <div className="room-cart-single">
        <div className="room-price">
            <div className="info-line">
                <p className="font-head-2 bold uppercase">Room:</p>
                <p className="font-head-2 uppercase">{name}</p>
            </div>
            <div className="info-line">
                <p className="font-head-2 bold uppercase">Price:</p>
                <p className="font-head-2 uppercase">Ksh. {pricePerNight.toLocaleString("en-KE")}</p>
            </div>
        </div>
        <div className="remove">
            <button className="font-head-2 uppercase" onClick={handleRemove}>Remove</button>
        </div>
    </div>
}

/* EXPORT */
export default CartItem;