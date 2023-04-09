import { useState } from "react";

import Cart from "./Cart";
import Checkout from "./Checkout";
import CheckAvailability from "../Home/CheckAvailability";
import RoomSelect from "./RoomSelect";

const Booking = props => {
    const { cart, setCart } = props;
    const [step, setStep] = useState("booking");

    const toggleCheckout = e => {
        e.preventDefault();
        setStep(step === "checkout" ? "booking" : "checkout");
    }

    const completeCheckout = e => {
        e.preventDefault();
        console.log("checkout");
    }

    return (
        <>
            <section id="booking-top">
                <div className="background black">
                    <h1 className="bold uppercase">Booking</h1>
                    <p>Book your stay at our serene guest house today.</p>
                </div>
                <CheckAvailability />
            </section>
            <section id="booking-main">
                {step === "checkout" ? <Checkout handleSubmit={completeCheckout} /> : <RoomSelect setCart={setCart} />}
                <Cart cart={cart} step={step} handleCheckout={toggleCheckout} />
            </section>
        </>
    )
}

export default Booking;