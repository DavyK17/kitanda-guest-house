/* COMPONENT */
const NotFound = () => {
    return (
        <section id="error-404" data-testid="not-found">
            <div className="background white">
                <div className="content align-items-start">
                    <h1 className="bold font-head uppercase">404 Error</h1>
                    <p>We're sorry, but the file you requested could not be found. It may have been removed, had its name changed, or is temporarily unavailable.</p>
                </div>
            </div>
        </section>
    )
}

/* EXPORT */
export default NotFound;