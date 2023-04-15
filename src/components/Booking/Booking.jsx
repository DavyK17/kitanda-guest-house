/* IMPORTS */
import { useState, useEffect } from "react";

import Cart from "./Cart";
import Checkout from "./Checkout";
import CheckAvailability from "../Home/CheckAvailability";
import RoomSelect from "./RoomSelect";

import { getAvailableRoomTypes } from "../../api/RoomTypes";

/* COMPONENT */
const Booking = props => {
    // Destructure props and dates
    const { dates, setDates, cart, setCart, roomTypes, setRoomTypes, items, setItems } = props;
    const { checkInDate, checkOutDate } = dates;

    /* STATE + FUNCTIONS */
    // Loading
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Booking step state
    const [step, setStep] = useState("booking");

    // Define function to automatically search for room types if search params are available
    const autoSearch = async () => {
        setError(false);

        const cartCheckIn = document.getElementById("check-in-date");
        cartCheckIn.textContent = new Date(checkInDate).toLocaleDateString("en-KE").replaceAll("/", "-");

        const cartCheckOut = document.getElementById("check-out-date");
        cartCheckOut.textContent = new Date(checkOutDate).toLocaleDateString("en-KE").replaceAll("/", "-");

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

    useEffect(() => {
        if (checkInDate && checkOutDate) autoSearch();
        // eslint-disable-next-line
    }, [checkInDate, checkOutDate]);

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

        const cartCheckIn = document.getElementById("check-in-date");
        cartCheckIn.textContent = new Date(checkInDate).toLocaleDateString("en-KE").replaceAll("/", "-");

        const cartCheckOut = document.getElementById("check-out-date");
        cartCheckOut.textContent = new Date(checkOutDate).toLocaleDateString("en-KE").replaceAll("/", "-");

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

    // Return component
    return (
        <>
            <section id="booking-top">
                <div className="background black">
                    <h1 className="bold uppercase">Booking</h1>
                    <p>Book your stay at our serene guest house today.</p>
                </div>
                <CheckAvailability dates={dates} setDates={setDates} handleSubmit={findAvailableRoomTypes} />
            </section>
            <section id="booking-main">
                {
                    step === "checkout" ?
                        <Checkout handleSubmit={completeCheckout} /> :
                        <RoomSelect roomTypes={roomTypes} items={items} setItems={setItems} cart={cart} setCart={setCart} isLoading={isLoading} error={error} />
                }
                <Cart cart={cart} setCart={setCart} step={step} handleCheckout={toggleCheckout} />
            </section>
        </>
    )
}

/* EXPORT */
export default Booking;