/* COMPONENT */
const Fetch = props => {
    // Destructure props
    const { handleSubmit } = props;

    // Return component
    return <form name="reservations-search" onSubmit={handleSubmit}>
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
}

/* EXPORT */
export default Fetch;