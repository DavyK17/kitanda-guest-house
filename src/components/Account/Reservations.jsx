/* IMPORTS */
import Skeleton from "react-loading-skeleton";

import Reservation from "./Reservation";

import { cancelReservation, confirmReservation } from "../../api/Reservations";
import displayErrorMessage from "../../util/displayErrorMessage";

/* COMPONENT */
const Reservations = props => {
    // Destructure props and define useNavigate()
    const { account, fetchAccount, list, isLoading, error, handleBack } = props;

    // Define function to render reservations
    const renderReservations = () => {
        // Return error message if error
        if (error) return <p className="error">An error occurred loading your reservations. Kindly refresh the page and try again.</p>;

        // Return skeleton if loading
        if (isLoading) return <Skeleton containerClassName="skeleton-container" containerTestId="account-reservations-loading" />;

        // Return message if no reservations found
        if (list.length === 0) return <p className="error">No reservations found.</p>;

        // Return reservations
        return list.map(({ id, checkInDate, checkOutDate, totalPrice, createdAt, status }, i) => {
            // Define function to cancel reservation
            const handleCancel = async e => {
                e.preventDefault();
                const reservationStatus = document.getElementById(`reservation-${id}-status`);

                reservationStatus.textContent = "Cancelling…"
                let response = await cancelReservation(id);
                if (!response.includes("Reservation cancelled")) {
                    reservationStatus.textContent = "Error";
                    alert(displayErrorMessage(response, true));
                } else {
                    fetchAccount();
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
                let response = await confirmReservation(id, e.target[0].value);
                if (!response.includes("Payment successfully made")) {
                    reservationStatus.textContent = "Error";
                    alert(displayErrorMessage(response, true));
                } else {
                    fetchAccount();
                }

                setTimeout(() => reservationStatus.textContent = status, 3000);
            }

            // Return reservation
            return <Reservation
                key={i}
                details={{ id, checkInDate, checkOutDate, totalPrice, createdAt, status }}
                phone={account.phone}
                handleCancel={handleCancel}
                toggleConfirm={toggleConfirm}
                handleConfirm={handleConfirm}
            />
        });
    }

    // Return component
    return <div className="reservations">
        <h2 className="bold uppercase">Your reservations</h2>
        <div className="list">
            {renderReservations()}
        </div>
        <div className="buttons">
            <button className="font-head-2 bold uppercase" onClick={handleBack}>Back to dashboard</button>
        </div>
    </div>
}

/* EXPORT */
export default Reservations;