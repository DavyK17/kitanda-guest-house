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
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App;