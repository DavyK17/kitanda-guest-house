/* COMPONENT */
const RoomTypeSort = props => {
    // Destructure props
    const { handleChangeSort, handleChangePriceType } = props;

    // Return component
    return <div className="sort" data-testid="booking-room-type-sort">
        <div>
            <label htmlFor="sort-by">Sort by</label>
            <select id="sort-by" onChange={handleChangeSort}>
                <option value="ascending">Price (low to high)</option>
                <option value="descending">Price (high to low)</option>
            </select>
        </div>
        <div>
            <label htmlFor="show-price">Show price</label>
            <select id="show-price" onChange={handleChangePriceType}>
                <option value="per-night">Per night</option>
                <option value="total">Total</option>
            </select>
        </div>
    </div>
}

/* EXPORT */
export default RoomTypeSort;