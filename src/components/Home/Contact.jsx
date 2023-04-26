/* COMPONENT */
const Contact = () => {
    // Define icons
    const iconLocation = (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" style={{ fill: "#fff" }} />
        </svg>
    )

    const iconPhone = (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M18.48 22.926l-1.193.658c-6.979 3.621-19.082-17.494-12.279-21.484l1.145-.637 3.714 6.467-1.139.632c-2.067 1.245 2.76 9.707 4.879 8.545l1.162-.642 3.711 6.461zm-9.808-22.926l-1.68.975 3.714 6.466 1.681-.975-3.715-6.466zm8.613 14.997l-1.68.975 3.714 6.467 1.681-.975-3.715-6.467z" style={{ fill: "#fff" }} />
        </svg>
    )

    const iconEmail = (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" style={{ fill: "#fff" }} />
        </svg>
    )

    // Return component
    return (
        <section id="contact" data-testid="home-contact">
            <div className="background black">
                <div className="content">
                    <h2 className="bold uppercase">Get In Touch</h2>
                    <div className="contact-details">
                        <p>
                            {iconLocation}
                            <span>Kilimani Road, off Elgeyo Marakwet Road</span>
                        </p>
                        <p>
                            {iconLocation}
                            <span>P.O. Box 0000&ndash;00000, Nairobi, Kenya</span>
                        </p>
                        <br />
                        <p>
                            {iconPhone}
                            <span>+254 712 345678</span>
                        </p>
                        <p>
                            {iconEmail}
                            <a href="mailto:info@malazi.co.ke">info@kitanda.co.ke</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* EXPORT */
export default Contact;