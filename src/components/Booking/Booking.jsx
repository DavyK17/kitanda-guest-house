/* IMPORTS */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
import Checkout from "./Checkout";
import CheckAvailability from "../Home/CheckAvailability";
import RoomSelect from "./RoomSelect";

import { getUser } from "../../api/Account";
import { getAddresses } from "../../api/Addresses";
import { getAvailableRoomTypes } from "../../api/RoomTypes";
import { makeReservation } from "../../api/Reservations";
import { createAddress } from "../../api/Addresses";

import displayErrorMessage from "../../util/displayErrorMessage";

/* COMPONENT */
const Booking = props => {
    // Destructure props and dates
    const { user, dates, setDates, cart, setCart, roomTypes, setRoomTypes, items, setItems } = props;
    const { checkInDate, checkOutDate } = dates;

    // Define useNavigate()
    let navigate = useNavigate();

    /* STATE + FUNCTIONS */
    // Loading
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Booking step state
    const [step, setStep] = useState("booking");

    // Contacts
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const fetchContacts = async () => {
        setIsLoading(true);

        try {
            let data = await getUser();
            if (data) {
                setPhone(data.phone);
                setEmail(data.email);

                data = await getAddresses();
                if (data.length > 0) setAddresses(data);
            }
        } catch (err) {
            console.error(err);
            setError(true);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchContacts();
    }, []);

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
    const completeCheckout = async e => {
        e.preventDefault();
        let addressId;
        const rooms = cart.map(({ id }) => id.toString());
        const status = document.getElementById("status");

        if (!user) {
            const address1 = e.target[4].value;
            const address2 = e.target[5].value;
            const townCity = e.target[6].value;
            const countyStateProvince = e.target[7].value;
            const postcodeZip = e.target[8].value;
            const country = e.target[9].value;

            status.textContent = "Creating address…";
            response = await createAddress(address1, address2, townCity, countyStateProvince, postcodeZip, country, reservationId);
            if (!response.includes("Address created")) return displayErrorMessage(response);

            addressId = response.split(" ").pop();
        } else {
            addressId = e.target[4].value;
        }

        status.textContent = "Making reservation…";
        let response = await makeReservation(addressId, phone, checkInDate, checkOutDate, rooms, email);
        if (!response.includes("Reservation made")) return displayErrorMessage(response);
        const reservationId = response.split(" ").pop();

        status.textContent = "Reservation made successfully.";
        setTimeout(() => {
            // Reset status element
            status.textContent = null;

            // Reset state
            setDates({ checkInDate: null, checkOutDate: null });
            setCart([]);
            setRoomTypes();
            setItems();

            // Navigate to home page
            navigate("/");
        }, 3000);
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
                        <Checkout user={user} phone={phone} setPhone={setPhone} email={email} setEmail={setEmail} addresses={addresses} handleSubmit={completeCheckout} /> :
                        <RoomSelect roomTypes={roomTypes} items={items} setItems={setItems} cart={cart} setCart={setCart} isLoading={isLoading} error={error} />
                }
                <Cart cart={cart} setCart={setCart} step={step} handleCheckout={toggleCheckout} />
            </section>
        </>
    )
}

/* EXPORT */
export default Booking;