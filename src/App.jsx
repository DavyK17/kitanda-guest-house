/* IMPORTS */
import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import { getUser } from "./api/Account";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/Other/NotFound";

import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import Booking from "./components/Booking/Booking";
import Account from "./components/Account/Account";

/* APP */
const App = () => {
    // Define class name for active menu item
    const activeClassName = "selected";

    /* STATE + FUNCTIONS */
    // Cart
    const [cart, setCart] = useState([]);

    // User
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        let data = await getUser();
        if (data) setUser(data);
    }

    useMemo(() => {
        fetchUser();
    }, []);


    /* RETURN APP */
    return (
        <>
            <Header activeClassName={activeClassName} user={user} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/booking" element={<Booking cart={cart} setCart={setCart} />} />
                    <Route path="/account" element={<Account user={user} setUser={setUser} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

/* EXPORT */
export default App;