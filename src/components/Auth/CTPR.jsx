/* COMPONENT */
const CTPR = props => {
    // Destructure props
    const { handleSubmit } = props;

    // Return form
    return (
        <form className="auth-form" id="ctpr" onSubmit={handleSubmit}>
            <legend>Confirm third-party registration</legend>

            <fieldset id="guest-details">
                <div className="label-input" id="form-password">
                    <label htmlFor="customer-password">Password*</label>
                    <input type="password" id="customer-password" placeholder="Password" required />
                </div>
                <div className="label-input" id="form-confirm-password">
                    <label htmlFor="customer-confirm-password">Confirm password*</label>
                    <input type="password" id="customer-confirm-password" placeholder="Confirm password" required />
                </div>
            </fieldset>

            <fieldset id="form-end">
                <button type="submit" className="font-head-2 bold uppercase">Submit</button>
            </fieldset>

            <p id="status"></p>
        </form>
    );
}

/* EXPORT */
export default CTPR;