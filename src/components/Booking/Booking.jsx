/* IMPORTS */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Cart from "./Cart";
import Checkout from "./Checkout";
import CheckAvailability from "../Home/CheckAvailability";
import RoomSelect from "./RoomSelect";

import { getAvailableRoomTypes } from "../../api/RoomTypes";

/* COMPONENT */
const Booking = props => {
    // Destructure props
    const { cart, setCart } = props;

    // Define search params
    const [searchParams] = useSearchParams();
    const paramsCheckInDate = searchParams.get("checkInDate");
    const paramsCheckOutDate = searchParams.get("checkOutDate");

    const autoSearch = async () => {
        setError(false);

        const cartCheckIn = document.getElementById("check-in-date");
        cartCheckIn.textContent = new Date(paramsCheckInDate).toLocaleDateString("en-KE").replaceAll("/", "-");

        const cartCheckOut = document.getElementById("check-out-date");
        cartCheckOut.textContent = new Date(paramsCheckOutDate).toLocaleDateString("en-KE").replaceAll("/", "-");

        setIsLoading(true);
        let response = await getAvailableRoomTypes(paramsCheckInDate, paramsCheckOutDate);
        if (typeof response !== "object") {
            setError(true)
        } else {
            setRoomTypes(response);
            setItems(response);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (paramsCheckInDate && paramsCheckOutDate) autoSearch();
        // eslint-disable-next-line
    }, [paramsCheckInDate, paramsCheckOutDate]);

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
                <CheckAvailability handleSubmit={findAvailableRoomTypes} />
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