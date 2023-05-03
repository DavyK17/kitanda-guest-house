/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RoomType from "../../../components/Booking/RoomType";
import { roomTypes } from "../../../util/dataMock";

/* TESTS */
describe("Booking room type component", () => {
    const roomTypeMock = roomTypes[0];
	const bookMock = jest.fn();

	beforeEach(() => {
		render(
			<Router>
                <RoomType classname="test" details={roomTypeMock} handleBook={bookMock} />
			</Router>
		);
	});

	test("calls handleBook when book button is clicked", () => {
		const button = screen.getByRole("button", { name: "Book now" });
		userEvent.click(button);
		expect(bookMock).toHaveBeenCalledTimes(1);
	});
});
