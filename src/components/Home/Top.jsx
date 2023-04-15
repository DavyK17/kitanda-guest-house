/* IMPORTS */
import { useNavigate } from "react-router-dom";

import CheckAvailability from "./CheckAvailability";
import Slideshow from "./Slideshow";

/* COMPONENT */
const Top = () => {
    // Define useNavigate()
    let navigate = useNavigate()

    // Define availability form submit function
    const beginSearch = e => {
        e.preventDefault();
        navigate(`/booking?checkInDate=${e.target[0].value}&checkOutDate=${e.target[1].value}`);
    }

    // Return component
    return (
        <section id="top">
            <Slideshow />
            <CheckAvailability handleSubmit={beginSearch} />
        </section>
    )
}

/* EXPORT */
export default Top;