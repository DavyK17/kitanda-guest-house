import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/Other/NotFound";

import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import Booking from "./components/Booking/Booking";
import Account from "./components/Account/Account";

const App = () => {
    const activeClassName = "selected";

    const [user, setUser] = useState(null);
    useMemo(() => {
        if (1 + 1 === 1) setUser({});
    }, []);

    return (
        <>
            <Header activeClassName={activeClassName} user={user} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/account" element={<Account user={user} setUser={setUser} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App;