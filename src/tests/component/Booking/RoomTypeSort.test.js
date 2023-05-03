/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RoomTypeSort from "../../../components/Booking/RoomTypeSort";

/* TESTS */
describe("Booking room type sort component", () => {
	const changeSortMock = jest.fn();
	const changePriceTypeMock = jest.fn();

	beforeEach(() => {
		render(
			<Router>
				<RoomTypeSort handleChangeSort={changeSortMock} handleChangePriceType={changePriceTypeMock} />
			</Router>
		);
	});

	test("calls handleChangeSort when sort option is changed", () => {
		const select = screen.getByLabelText("Sort by");
		userEvent.selectOptions(select, ["descending"]);
		expect(changeSortMock).toHaveBeenCalledTimes(1);
	});

	test("calls handleChangePriceType when price option is changed", () => {
		const select = screen.getByLabelText("Show price");
		userEvent.selectOptions(select, ["total"]);
		expect(changePriceTypeMock).toHaveBeenCalledTimes(1);
	});
});
