const Login = () => {
    return (
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
    )
}

export default Login;