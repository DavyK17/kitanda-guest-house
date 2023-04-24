/* IMPORTS */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import Reservation from "./Reservation";

import { getReservations, cancelReservation, confirmReservation } from "../../api/Reservations";
import displayErrorMessage from "../../util/displayErrorMessage";

/* COMPONENT */
const Track = props => {
    // Destructure props and define useNavigate()
    const { user } = props;
    let navigate = useNavigate();

    // Redirect to authentication if not authenticated
    useEffect(() => {
        if (user) navigate("/account/reservations");
        // eslint-disable-next-line
    }, [user]);

    /* STATE + FUNCTIONS */
    // Loading
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Reservation
    const [email, setEmail] = useState();
    const [reservation, setReservation] = useState();

    const fetchReservation = async e => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setEmail(e.target[0].value);
            let data = await getReservations(e.target[1].value, e.target[0].value);
            if (data) setReservation(data);
        } catch (err) {
            console.error(err);
            setError(true);
        }

        setIsLoading(false);
    }

    // Define function to render reservations
    const renderReservation = () => {
        // Return error message if error
        if (error) return <p className="error">An error occurred loading your reservations. Kindly refresh the page and try again.</p>;

        // Return skeleton if loading
        if (isLoading) return <Skeleton containerClassName="skeleton-container" containerTestId="track-reservation-loading" />;

        // Return message if no reservations found
        if (!reservation) return <p className="error">No reservation found.</p>;

        // Destructure reservation
        const { id, checkInDate, checkOutDate, totalPrice, rooms, createdAt, status } = reservation;

        // Define function to cancel reservation
        const handleCancel = async e => {
            e.preventDefault();
            const reservationStatus = document.getElementById(`reservation-${id}-status`);

            reservationStatus.textContent = "Cancelling…"
            let response = await cancelReservation(id, email);
            if (!response.includes("Reservation cancelled")) {
                reservationStatus.textContent = "Error";
                alert(displayErrorMessage(response, true));
            } else {
                fetchReservation();
            }

            setTimeout(() => reservationStatus.textContent = status, 3000);
        }

        // Define functions to confirm reservation
        const toggleConfirm = e => {
            e.preventDefault();
            const confirmForm = document.getElementById(`reservation-${id}-payment`);
            confirmForm.classList.toggle("d-flex");
        }

        const handleConfirm = async e => {
            e.preventDefault();
            const reservationStatus = document.getElementById(`reservation-${id}-status`);

            reservationStatus.textContent = "Confirming…"
            let response = await confirmReservation(id, e.target[0].value, email);
            if (!response.includes("Payment successfully made")) {
                reservationStatus.textContent = "Error";
                alert(displayErrorMessage(response, true));
            } else {
                fetchReservation();
            }

            setTimeout(() => reservationStatus.textContent = status, 3000);
        }

        // Return reservation
        return <Reservation
            key={null}
            details={{ id, checkInDate, checkOutDate, totalPrice, rooms, createdAt, status }}
            phone={null}
            handleCancel={handleCancel}
            toggleConfirm={toggleConfirm}
            handleConfirm={handleConfirm}
        />
    }

    // Return component
    return (
        <>
            <section id="account-top">
                <div className="background black">
                    <h1 className="bold uppercase">Tracker</h1>
                    <p>Find out more about your reservation.</p>
                </div>
            </section>
            <section id="account-main">
                <form className="reservations-search" onSubmit={fetchReservation}>
                    <div className="input">
                        <label className="font-head-2" htmlFor="reservation-email">Email address</label>
                        <input type="email" id="reservation-email" name="reservation-email" placeholder="name@example.com" required />
                    </div>
                    <div className="input">
                        <label className="font-head-2" htmlFor="reservation-id">Reservation ID</label>
                        <input type="text" id="reservation-id" name="reservation-id" placeholder="0000000" required />
                    </div>
                    <button type="submit" className="font-head-2 bold uppercase">Track</button>
                </form>
                <div className="content align-items-start">
                    <div className="reservations">
                        <div className="list">
                            {renderReservation()}
                        </div>
                    </div>
                    <p id="status"></p>
                </div>
            </section>
        </>
    );
};

/* EXPORT */
export default Track;
