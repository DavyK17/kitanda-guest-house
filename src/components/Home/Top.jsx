/* IMPORTS */
import { useNavigate } from "react-router-dom";

import CheckAvailability from "./CheckAvailability";
import Slideshow from "./Slideshow";

/* COMPONENT */
const Top = props => {
    // Destructure props
    const { dates, setDates } = props;

    // Define useNavigate()
    let navigate = useNavigate()

    // Define availability form submit function
    const beginSearch = e => {
        e.preventDefault();
        navigate("/booking");
    }

    // Return component
    return (
        <section id="top">
            <Slideshow />
            <CheckAvailability dates={dates} setDates={setDates} handleSubmit={beginSearch} />
        </section>
    )
}

/* EXPORT */
export default Top;