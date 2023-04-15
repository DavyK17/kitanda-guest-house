/* IMPORTS */
import Skeleton from "react-loading-skeleton";

/* COMPONENT */
const RoomSelect = props => {
    // Destructure props
    const { roomTypes, items, setItems, cart, setCart, isLoading, error } = props;

    // Define function to render sort element
    const renderSort = () => {
        // Define function to sort by price
        const sortByPrice = ({ target }) => {
            const toSort = [].concat(items);
            const sorted = toSort.sort((a, b) => {
                if (target.value === "ascending") return a.pricePerNight - b.pricePerNight;
                if (target.value === "descending") return b.pricePerNight - a.pricePerNight;
                return 0;
            });

            setItems(sorted);
        }

        // Define function to change price type
        const changePriceType = ({ target }) => {
            const changed = roomTypes.map(roomType => {
                if (target.value === "total") {
                    const checkInDate = new Date(document.getElementById("arrival").value);
                    const checkOutDate = new Date(document.getElementById("departure").value);
                    const stayInDays = (checkOutDate - checkInDate) / 86400000;

                    return { ...roomType, pricePerNight: roomType.pricePerNight * stayInDays };
                }

                return roomType;
            });

            setItems(changed);
        }

        // Return sort element
        if (Array.isArray(roomTypes) && roomTypes.length > 0) return <div className="sort">
            <div>
                <label htmlFor="sort-by">Sort by</label>
                <select name="sort-by" onChange={sortByPrice}>
                    <option value="ascending">Price (low to high)</option>
                    <option value="descending">Price (high to low)</option>
                </select>
            </div>
            <div>
                <label htmlFor="show-price">Show price</label>
                <select name="show-price" onChange={changePriceType}>
                    <option value="per-night">Per night</option>
                    <option value="total">Total</option>
                </select>
            </div>
        </div>
    }

    // Define function to render room types
    const renderRoomTypes = () => {
        // Return error message if error
        if (error) return <p className="error">An error occurred loading room types. Kindly refresh the page and try again.</p>;

        // Return skeleton if loading
        if (isLoading) return <Skeleton containerClassName="skeleton-container" containerTestId="booking-room-select-loading" />;

        // Return default text if room types not loaded
        if (!items) return <p>Use the form above to check for available rooms.</p>;

        // Do the following if room types loaded
        if (Array.isArray(items)) {
            // Return error message if no room types found
            if (items.length === 0) return <p>No available rooms found.</p>;

            // Return room types
            return items.map(({ id, name, features, numOfAdults, numOfChildren, numOfInfants, pricePerNight }, i) => {
                // Define function to generate class name
                const className = name.toLowerCase().split(" ").join("-");

                // Define function to add room type to cart
                const addToCart = async () => {
                    const updated = [].concat(cart);
                    const roomType = roomTypes.filter(roomType => roomType.id === id)[0];

                    const checkInDate = new Date(document.getElementById("arrival").value);
                    const checkOutDate = new Date(document.getElementById("departure").value);
                    const stayInDays = (checkOutDate - checkInDate) / 86400000;

                    updated.push({ ...roomType, pricePerNight: roomType.pricePerNight * stayInDays });
                    setCart(updated);
                }

                // Return card
                return <div className={`room-card ${className}`} key={i}>
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
                            <button className="font-head-2 bold uppercase" onClick={addToCart}>Book now</button>
                        </div>
                    </div>
                </div>
            });
        }
    }

    // Return component
    return (
        <>
            {renderSort()}
            <div className="rooms">
                <div className="content align-items-start">
                    {renderRoomTypes()}
                </div>
            </div>
        </>
    )
}

/* EXPORT */
export default RoomSelect;