const CheckAvailability = props => {
    const { handleSubmit } = props;

    const iconCheckbox = (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M5.48 10.089l1.583-1.464c1.854.896 3.028 1.578 5.11 3.063 3.916-4.442 6.503-6.696 11.312-9.688l.515 1.186c-3.965 3.46-6.87 7.314-11.051 14.814-2.579-3.038-4.301-4.974-7.469-7.911zm12.52 3.317v6.594h-16v-16h15.141c.846-.683 1.734-1.341 2.691-2h-19.832v20h20v-11.509c-.656.888-1.318 1.854-2 2.915z" style={{ fill: "#fff" }} />
        </svg>
    )

    return (
        <div className="check-availability">
            <div className="container">
                <div id="availability-form-head">
                    {iconCheckbox}
                    <h2 className="uppercase">Check Availability</h2>
                </div>
                <form id="availability-form" onSubmit={handleSubmit}>
                    <div className="label-input">
                        <label htmlFor="arrival">Arrival date</label>
                        <input type="date" id="arrival" name="arrival" />
                    </div>
                    <div className="label-input">
                        <label htmlFor="departure">Departure date</label>
                        <input type="date" id="departure" name="departure" />
                    </div>
                    <div className="label-input a-c-i">
                        <label htmlFor="adults">Adults</label>
                        <input type="number" id="adults" name="adults" defaultValue="1" />
                    </div>
                    <div className="label-input a-c-i">
                        <label htmlFor="children"><span data-toggle="tooltip" data-placement="top" title="Children aged 0-6 years stay for free sharing with the parents. Children over 12 years are considered adults.">Children</span></label>
                        <input type="number" id="children" name="children" defaultValue="0" />
                    </div>
                    <div className="label-input a-c-i">
                        <label htmlFor="infants">Infants</label>
                        <input type="number" id="infants" name="infants" defaultValue="0" />
                    </div>
                    <button className="bold uppercase" type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default CheckAvailability;