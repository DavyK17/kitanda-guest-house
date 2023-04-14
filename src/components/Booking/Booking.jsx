import { useState } from "react";

import Cart from "./Cart";
import Checkout from "./Checkout";
import CheckAvailability from "../Home/CheckAvailability";
import RoomSelect from "./RoomSelect";

import { getAvailableRoomTypes } from "../../api/RoomTypes";

const Booking = props => {
    // Destructure props
    const { cart, setCart } = props;

    /* STATE + FUNCTIONS */
    // Loading
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Room types
    const [roomTypes, setRoomTypes] = useState();
    const [items, setItems] = useState();

    // Booking step state
    const [step, setStep] = useState("booking");

    // Define function to toggle step state
    const toggleCheckout = e => {
        e.preventDefault();
        setStep(step === "checkout" ? "booking" : "checkout");
    }

    // Define function to complete checkout
    const completeCheckout = e => {
        e.preventDefault();
        console.log("checkout");
    }

    // Define function to find available room types
    const findAvailableRoomTypes = async e => {
        e.preventDefault();
        setError(false);

        const checkInDate = e.target[0].value;
        const checkOutDate = e.target[1].value;

        setIsLoading(true);
        let response = await getAvailableRoomTypes(checkInDate, checkOutDate);
        if (typeof response !== "object") {
            setError(true)
        } else {
            setRoomTypes(response);
            setItems(response);
        }

        setIsLoading(false);
    }

    return (
        <>
            <section id="booking-top">
                <div className="background black">
                    <h1 className="bold uppercase">Booking</h1>
                    <p>Book your stay at our serene guest house today.</p>
                </div>
                <CheckAvailability handleSubmit={findAvailableRoomTypes} />
            </section>
            <section id="booking-main">
                {
                    step === "checkout" ?
                        <Checkout handleSubmit={completeCheckout} /> :
                        <RoomSelect roomTypes={roomTypes} items={items} setItems={setItems} isLoading={isLoading} error={error} setCart={setCart} />
                }
                <Cart cart={cart} step={step} handleCheckout={toggleCheckout} />
            </section>
        </>
    )
}

export default Booking;