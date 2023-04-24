/* IMPORTS */
import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import { getUser } from "./api/Auth";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/Other/NotFound";

import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import Booking from "./components/Booking/Booking";
import Tracker from "./components/Tracker/Tracker";

import Account from "./components/Account/Account";
import Auth from "./components/Auth/Auth";

/* APP */
const App = () => {
    // Define class name for active menu item
    const activeClassName = "selected";

    /* STATE + FUNCTIONS */
    // Dates
    const [dates, setDates] = useState({ checkInDate: null, checkOutDate: null });

    // Room types
    const [roomTypes, setRoomTypes] = useState();
    const [items, setItems] = useState();

    // Cart
    const [cart, setCart] = useState([]);

    // User
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        let data = await getUser();
        if (data) setUser(data);
    }

    useMemo(() => {
        // Fetch user
        fetchUser();

        // Set default dates
        const tomorrow = new Date(Date.now() + (24 * 60 * 60 * 1000)).toLocaleDateString("fr-CA");
        const dayAfterTomorrow = new Date(Date.now() + ((24 * 60 * 60 * 1000) * 2)).toLocaleDateString("fr-CA");
        setDates({ checkInDate: tomorrow, checkOutDate: dayAfterTomorrow });
    }, []);

    // Define conditions for confirming third-party registration
    const ctpr = user && user.federatedCredentials.length > 0 && !user.federatedCredentials[0].confirmed;

    /* APP */
    // Define function to render main section
    const renderMain = () => {
        // Return CTPR component if third-party registration not confirmed
        if (ctpr) return <Auth ctpr={ctpr} user={user} setUser={setUser} />;

        // Define function to return account route
        const renderAccountRoute = (path, view = path) => <Route path={path} element={<Account view={view} user={user} setUser={setUser} />} />;

        // Return routes
        return <Routes>
            <Route path="/" element={<Home dates={dates} setDates={setDates} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={
                <Booking
                    user={user}
                    dates={dates}
                    setDates={setDates}
                    cart={cart}
                    setCart={setCart}
                    roomTypes={roomTypes}
                    setRoomTypes={setRoomTypes}
                    items={items}
                    setItems={setItems}
                />
            } />
            <Route path="/tracker" element={<Tracker user={user} />} />
            <Route path="/account">
                {renderAccountRoute("addresses")}
                {renderAccountRoute("details")}
                {renderAccountRoute("dashboard")}
                {renderAccountRoute("reservations")}
                {renderAccountRoute("", "dashboard")}
            </Route>
            <Route path="/auth" element={<Auth user={user} setUser={setUser} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    }

    // Return app
    return (
        <>
            <Header activeClassName={activeClassName} user={user} />
            <main>
                {renderMain()}
            </main>
            <Footer />
        </>
    )
}

/* EXPORT */
export default App;