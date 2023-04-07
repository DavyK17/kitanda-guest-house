import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

const Auth = () => {
    const [hasAccount, setHasAccount] = useState(true);
    const toggleHasAccount = e => {
        e.preventDefault();
        setHasAccount(!hasAccount);
    }

    const handleLogin = e => {
        e.preventDefault();
        console.log("login");
    }

    const handleRegister = e => {
        e.preventDefault();
        console.log("register");
    }

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
                    {hasAccount ?
                        <Login toggleHasAccount={toggleHasAccount} handleSubmit={handleLogin} /> :
                        <Register toggleHasAccount={toggleHasAccount} handleSubmit={handleRegister} />
                    }
                </div>
            </section>
        </>
    )
}

export default Auth;