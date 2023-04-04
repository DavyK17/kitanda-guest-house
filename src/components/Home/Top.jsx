import CheckAvailability from "./CheckAvailability";

const Top = () => {
    const findRooms = e => {
        e.preventDefault();
    }

    return (
        <section id="top">
            <CheckAvailability handleSubmit={findRooms} />
        </section>
    )
}

export default Top;