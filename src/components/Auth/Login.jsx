const Login = props => {
    const { toggleHasAccount, handleSubmit } = props;

    return (
        <form id="login" onSubmit={handleSubmit}>
            <legend>Login</legend>

            <fieldset id="guest-details">
                <div className="label-input" id="form-email">
                    <label htmlFor="customer-email">Email address</label>
                    <input type="email" id="customer-email" name="customer-email" placeholder="name@example.com" required />
                </div>

                <div className="label-input" id="form-password">
                    <label htmlFor="customer-password">Password</label>
                    <input type="password" id="customer-password" placeholder="Password" required />
                </div>
            </fieldset>

            <fieldset id="form-end">
                <button type="submit" className="font-head-2 bold uppercase">Submit</button>
                <button className="font-head-2 bold uppercase" onClick={toggleHasAccount}>Sign up instead</button>
            </fieldset>

            <p id="status"></p>
        </form>
    )
}

export default Login;