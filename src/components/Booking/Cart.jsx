/* COMPONENT */
const Cart = props => {
    // Destructure props
    const { cart, setCart, step, handleCheckout } = props;

    // Define function to render cart body
    const renderCartBody = () => {
        // Return message if cart is empty
        if (cart.length === 0) return <p>No rooms have been selected.</p>;

        // Define function to render cart total
        const cartTotal = () => cart.map(item => item.pricePerNight).reduce((prev, curr) => prev + curr).toLocaleString("en-KE");

        // Return cart body
        return <>
            {
                cart.map(({ id, name, pricePerNight }, i) => {
                    // Define function to remove item from cart
                    const removeFromCart = async () => {
                        const updated = [].concat(cart).filter(roomType => roomType.id !== id);
                        setCart(updated);
                    }

                    // Return cart item
                    return <div className="room-cart-single" key={i}>
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
                            <button className="font-head-2 uppercase" onClick={removeFromCart}>Remove</button>
                        </div>
                    </div>
                })
            }
            <div className="room-cart-checkout">
                <div className="info-line">
                    <p className="font-head-2 bold uppercase">Total:</p>
                    <p className="font-head-2 bold uppercase">Ksh. {cartTotal()}</p>
                </div>
                <button className="font-head-2 bold uppercase" onClick={handleCheckout}>{step === "checkout" ? "Back" : "Checkout"}</button>
            </div>
        </>
    }

    // Return component
    return (
        <div className="cart" id="booking-cart">
            <div className="content">
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
                        {renderCartBody()}
                    </div>
                </div>
            </div>
        </div>
    )
}

/* EXPORT */
export default Cart;