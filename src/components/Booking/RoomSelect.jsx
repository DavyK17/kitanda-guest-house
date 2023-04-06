const RoomSelect = () => {
    return (
        <>
            <div className="sort">
                <div>
                    <label htmlFor="sort-by">Sort by</label>
                    <select name="sort-by">
                        <option value="#">Price (low to high)</option>
                        <option value="#">Price (high to low)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="show">Show price</label>
                    <select name="show">
                        <option value="#">Per room, per night</option>
                        <option value="#">Total price</option>
                    </select>
                </div>
            </div>
            <div className="rooms">
                <div className="content align-items-start">
                    {/* <!-- TEXT TO SHOW WHEN AVAILABILITY FORM HAS NOT BEEN SUBMITTED --> */}
                    <p>Use the form above to check for available rooms.</p>
        
                    {/* <!-- CARD(S) TO SHOW WHEN AVAILABILITY FORM HAS BEEN SUBMITTED --> */}
        
                    {/* <!-- Single room --> */}
                    <div className="room-card single-room">
                        <div className="room-card-header">
                            <p className="font-head-2 semi-bold uppercase">Single room</p>
                            <p className="font-head-2 room-card-price uppercase">Ksh. 3,000</p>
                        </div>
                        <div className="room-card-body">
                            <div className="room-img"></div>
                            <div className="room-features">
                                <p className="font-head-2 bold uppercase">Features</p>
                                <ul>
                                    <li>1 single bed</li>
                                </ul>
                            </div>
                            <div className="room-capacity">
                                <p className="font-head-2 bold uppercase">Capacity</p>
                                <ul>
                                    <li>1 adult</li>
                                    <li>1 child</li>
                                </ul>
                            </div>
                            <div className="room-book">
                                <button className="font-head-2 bold uppercase">Book now</button>
                            </div>
                        </div>
                    </div>
        
                    {/* <!-- Double room --> */}
                    <div className="room-card double-room">
                        <div className="room-card-header">
                            <p className="font-head-2 semi-bold uppercase">Double room</p>
                            <p className="font-head-2 room-card-price uppercase">Ksh. 3,500</p>
                        </div>
                        <div className="room-card-body">
                            <div className="room-img"></div>
                            <div className="room-features">
                                <p className="font-head-2 bold uppercase">Features</p>
                                <ul>
                                    <li>1 double bed</li>
                                </ul>
                            </div>
                            <div className="room-capacity">
                                <p className="font-head-2 bold uppercase">Capacity</p>
                                <ul>
                                    <li>2 adults</li>
                                    <li>2 children</li>
                                    <li>1 infant</li>
                                </ul>
                            </div>
                            <div className="room-book">
                                <button className="font-head-2 bold uppercase">Book now</button>
                            </div>
                        </div>
                    </div>
        
                    {/* <!-- Twin room --> */}
                    <div className="room-card twin-room">
                        <div className="room-card-header">
                            <p className="font-head-2 semi-bold uppercase">Twin room</p>
                            <p className="font-head-2 room-card-price uppercase">Ksh. 3,700</p>
                        </div>
                        <div className="room-card-body">
                            <div className="room-img"></div>
                            <div className="room-features">
                                <p className="font-head-2 bold uppercase">Features</p>
                                <ul>
                                    <li>1 twin bed</li>
                                </ul>
                            </div>
                            <div className="room-capacity">
                                <p className="font-head-2 bold uppercase">Capacity</p>
                                <ul>
                                    <li>2 adults</li>
                                    <li>1 child</li>
                                </ul>
                            </div>
                            <div className="room-book">
                                <button className="font-head-2 bold uppercase">Book now</button>
                            </div>
                        </div>
                    </div>
        
                    {/* <!-- Triple room --> */}
                    <div className="room-card triple-room">
                        <div className="room-card-header">
                            <p className="font-head-2 semi-bold uppercase">Triple room</p>
                            <p className="font-head-2 room-card-price uppercase">Ksh. 5,500</p>
                        </div>
                        <div className="room-card-body">
                            <div className="room-img"></div>
                            <div className="room-features">
                                <p className="font-head-2 bold uppercase">Features</p>
                                <ul>
                                    <li>1 single bed</li>
                                    <li>1 double bed</li>
                                </ul>
                            </div>
                            <div className="room-capacity">
                                <p className="font-head-2 bold uppercase">Capacity</p>
                                <ul>
                                    <li>3 adults</li>
                                    <li>3 children</li>
                                    <li>2 infants</li>
                                </ul>
                            </div>
                            <div className="room-book">
                                <button className="font-head-2 bold uppercase">Book now</button>
                            </div>
                        </div>
                    </div>
        
        
                </div>
            </div>
        </>
    )
}

export default RoomSelect;