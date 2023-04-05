import CheckAvailability from "./CheckAvailability";
import Slideshow from "./Slideshow";

const Top = () => {
    const findRooms = e => {
        e.preventDefault();
    }

    return (
        <section id="top">
            <Slideshow />
            <CheckAvailability handleSubmit={findRooms} />
        </section>
    )
}

export default Top;