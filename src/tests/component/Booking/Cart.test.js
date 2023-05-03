/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Cart from "../../../components/Booking/Cart";
import { roomTypes } from "../../../util/dataMock";

/* TESTS */
describe("Booking cart component", () => {
	const checkoutMock = jest.fn();

	beforeEach(() => {
		render(
			<Router>
				<Cart cart={roomTypes} step="booking" handleCheckout={checkoutMock} />
			</Router>
		);
	});

	test("calls handleCheckout when checkout button is clicked", () => {
		const button = screen.getByRole("button", { name: "Checkout" });
		userEvent.click(button);
		expect(checkoutMock).toHaveBeenCalledTimes(1);
	});
});
