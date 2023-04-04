import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/Other/NotFound";

import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import Booking from "./components/Booking/Booking";
import Contact from "./components/Contact/Contact";

const App = () => {
    const activeClassName = "selected";

    return (
        <>
            <Header activeClassName={activeClassName} />
            <main>
                <Routes>
                    <Route path="/" Component={<Home />} />
                    <Route path="/gallery" Component={<Gallery />} />
                    <Route path="/booking" Component={<Booking />} />
                    <Route path="/contact" Component={<Contact />} />
                    <Route path="*" Component={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App;