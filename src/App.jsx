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

import Account from "./components/Account/Account";
import Auth from "./components/Auth/Auth";

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

    // Define conditions for confirming third-party registration
    const ctpr = user && user.federatedCredentials.length > 0 && !user.federatedCredentials[0].confirmed;

    /* APP */
    // Define function to render main section
    const renderMain = () => {
        // Return CTPR component if third-party registration not confirmed
        if (ctpr) return <Account view="ctpr" user={user} setUser={setUser} />;

        // Define function to return account route
        const renderAccountRoute = (path, view = path) => <Route path={path} element={<Account view={view} user={user} setUser={setUser} />} />;

        // Return routes
        return <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<Booking cart={cart} setCart={setCart} />} />
            <Route path="/account">
                {renderAccountRoute("addresses")}
                {renderAccountRoute("details")}
                {renderAccountRoute("dashboard")}
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