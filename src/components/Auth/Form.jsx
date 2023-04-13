/* IMPORTS */
import FacebookIcon from "../../assets/img/icons/facebook.svg";
import GoogleIcon from "../../assets/img/icons/google.svg";

import Login from "./Login";
import Register from "./Register";

import capitalise from "../../util/capitalise";

/* COMPONENT */
const Form = props => {
    // Destructure props
    const { hasAccount, toggleHasAccount, handleSubmit } = props;

    // Define third-party icons
    const icons = { facebook: FacebookIcon, google: GoogleIcon };

    // Define function to return third-party authentication buttons
    const renderThirdPartyButton = provider => {
        return (
            <a href={`/api/auth/login/${provider}`} title={`Authenticate with ${capitalise(provider)}`}>
                <img src={icons[provider]} alt={`${capitalise(provider)} icon`} />
            </a>
        )
    }

    return (
        <form className="auth-form" id={hasAccount ? "login" : "register"} onSubmit={handleSubmit}>
            <legend>Sign {hasAccount ? "in" : "up"}</legend>

            {hasAccount ? <Login /> : <Register />}

            <fieldset id="form-end">
                <button type="submit" className="font-head-2 bold uppercase">Sign {hasAccount ? "in" : "up"}</button>
                <button className="font-head-2 bold uppercase" onClick={toggleHasAccount}>Sign {hasAccount ? "up" : "in"} instead</button>
                <div className="third-party-buttons">
                    {renderThirdPartyButton("facebook")}
                    {renderThirdPartyButton("google")}
                </div>
            </fieldset>

            <p id="status"></p>
        </form>
    )
}

/* EXPORT */
export default Form;