/* IMPORTS */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "./Form";

import { login, register } from "../../api/Auth";
import displayErrorMessage from "../../util/displayErrorMessage";

/* COMPONENT */
const Auth = props => {
    // Destructure props and useNavigate()
    const { user, setUser } = props;
    let navigate = useNavigate();

    // Redirect to dashboard if authenticated
    useEffect(() => {
        if (user) navigate("/account/dashboard");
        // eslint-disable-next-line
    }, [user]);

    /* STATE + FUNCTIONS */
    // Has account
    const [hasAccount, setHasAccount] = useState(true);
    const toggleHasAccount = e => {
        e.preventDefault();
        setHasAccount(!hasAccount);
    }

    // Login
    const handleLogin = async e => {
        e.preventDefault();
        const status = document.getElementById("status");

        const email = e.target[1].value;
        const password = e.target[2].value;

        status.textContent = "Logging in…";
        let response = await login(email, password);
        if (typeof response !== "object") return displayErrorMessage(response);

        status.textContent = null;
        e.target.reset();
        setUser(response);
        navigate("/account/dashboard");
    }

    // Register
    const handleRegister = async e => {
        e.preventDefault();
        const status = document.getElementById("status");

        const title = e.target[1].value;
        const firstName = e.target[2].value;
        const lastName = e.target[3].value;
        const companyName = e.target[4].value;
        const address1 = e.target[5].value;
        const address2 = e.target[6].value;
        const townCity = e.target[7].value;
        const countyStateProvince = e.target[8].value;
        const postcodeZip = e.target[9].value;
        const country = e.target[10].value;
        const phone = e.target[11].value;
        const email = e.target[12].value;
        const password = e.target[13].value;
        const confirmPassword = e.target[14].value;

        if (password !== confirmPassword) return status.textContent = "Passwords do not match.";

        status.textContent = "Creating account…";
        let response = await register(title, firstName, lastName, companyName, address1, address2, townCity, countyStateProvince, postcodeZip, country, phone, email, password, confirmPassword);
        if (!response.includes("User created")) return displayErrorMessage(response);

        status.textContent = "Account created. Kindly log in.";
        e.target.reset();
        setHasAccount(true);
        setTimeout(() => status.textContent = null, 3000);
    }

    /* RETURN COMPONENT */
    return (
        <>
            <section id="auth-top">
                <div className="background black">
                    <h1 className="bold uppercase">Authentication</h1>
                    <p>Access your user account.</p>
                </div>
            </section>
            <section id="auth-main">
                <div className="content align-items-start">
                    <Form hasAccount={hasAccount} toggleHasAccount={toggleHasAccount} handleSubmit={hasAccount ? handleLogin : handleRegister} />
                </div>
            </section>
        </>
    )
}

/* EXPORT */
export default Auth;