/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartItem from "../../../components/Booking/CartItem";
import { roomTypes } from "../../../util/dataMock";

/* TESTS */
describe("Booking cart item component", () => {
    const cartItemMock = roomTypes[0];
	const removeMock = jest.fn();

	beforeEach(() => {
		render(
			<Router>
                <CartItem details={cartItemMock} handleRemove={removeMock} />
			</Router>
		);
	});

	test("calls handleRemove when remove button is clicked", () => {
		const button = screen.getByRole("button", { name: "Remove" });
		userEvent.click(button);
		expect(removeMock).toHaveBeenCalledTimes(1);
	});
});
