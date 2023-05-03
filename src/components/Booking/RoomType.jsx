/* COMPONENT */
const RoomType = props => {
    // Destructure props and details
    const { className, details, handleBook } = props;
    const { name, features, numOfAdults, numOfChildren, numOfInfants, pricePerNight } = details;

    // Return component
    return <div className={`room-card ${className}`}>
        <div className="room-card-header">
            <p className="font-head-2 semi-bold uppercase">{name}</p>
            <p className="font-head-2 room-card-price uppercase">Ksh. {pricePerNight.toLocaleString("en-KE")}</p>
        </div>
        <div className="room-card-body">
            <div className="room-img"></div>
            <div className="room-features">
                <p className="font-head-2 bold uppercase">Features</p>
                <ul>
                    {features.map((feature, i) => <li key={i}>{feature}</li>)}
                </ul>
            </div>
            <div className="room-capacity">
                <p className="font-head-2 bold uppercase">Capacity</p>
                <ul>
                    {numOfAdults > 0 ? <li>{numOfAdults} adult{numOfAdults > 1 ? "s" : null}</li> : null}
                    {numOfChildren > 0 ? <li>{numOfChildren} child{numOfChildren > 1 ? "ren" : null}</li> : null}
                    {numOfInfants > 0 ? <li>{numOfInfants} infant{numOfInfants > 1 ? "s" : null}</li> : null}
                </ul>
            </div>
            <div className="room-book">
                <button className="font-head-2 bold uppercase" onClick={handleBook}>Book now</button>
            </div>
        </div>
    </div>
}

/* EXPORT */
export default RoomType;