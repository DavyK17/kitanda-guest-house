/* COMPONENT */
// const Cart = props => {
const Cart = () => {
    // Destructure props
    // const { step, handleCheckout } = props;
    
    // Return component
    return (
        <div className="cart" id="booking-cart">
            <div className="content">
                {/* <!-- CART --> */}
                <div className="room-cart">
                    <div className="room-cart-header">
                        <div className="info-line">
                            {/* <!-- Checking in date --> */}
                            <h3 className="font-head-2 semi-bold uppercase">Checking in</h3>
                            <h3 className="font-head-2 light uppercase" id="check-in-date">DD-MM-YYYY</h3>
                        </div>
                        <div className="info-line">
                            {/* <!-- Checking out date --> */}
                            <h3 className="font-head-2 semi-bold uppercase">Checking out</h3>
                            <h3 className="font-head-2 light uppercase" id="check-out-date">DD-MM-YYYY</h3>
                        </div>
                    </div>
    
                    <div className="room-cart-body">
                        {/* <!-- TEXT TO SHOW WHEN CART IS EMPTY --> */}
                        <p>No rooms have been selected.</p>
    
                        {/* <!-- Single booking --> */}
                        {/* <div className="room-cart-single">
                            <div className="info-line">
                                <p className="font-head-2 bold uppercase">Room:</p>
                                <p className="font-head-2 uppercase">Room type</p>
                            </div>
                            <div className="info-line">
                                <p className="font-head-2 bold uppercase">Stay:</p>
                                <div className="stay">
                                    <p className="font-head-2 uppercase">N nights</p>
                                    <p className="font-head-2 uppercase">(N adults, N children, N infants)</p>
                                </div>
                            </div>
                            <div className="info-line">
                                <p className="font-head-2 bold uppercase">Price:</p>
                                <p className="font-head-2 uppercase">Ksh. 0,000</p>
                            </div>
                            <div className="remove">
                                <button className="font-head-2 uppercase" href="#">Remove</button>
                            </div>
                        </div> */}
    
                        {/* <!-- Checkout button --> */}
                        {/* <div className="room-cart-checkout">
                            <div className="info-line">
                                <p className="font-head-2 uppercase">Subtotal:</p>
                                <p className="font-head-2 uppercase">Ksh. 0,000</p>
                            </div>
                            <div className="info-line">
                                <p className="font-head-2 bold uppercase">Total:</p>
                                <p className="font-head-2 bold uppercase">Ksh. 0,000</p>
                            </div>
                            <button className="font-head-2 bold uppercase" onClick={handleCheckout}>{step === "checkout" ? "Back" : "Checkout"}</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

/* EXPORT */
export default Cart;