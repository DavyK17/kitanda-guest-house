/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Reservation from "../../../components/Account/Reservation";
import { reservations } from "../../../util/dataMock";

/* TESTS */
describe("Account reservation component", () => {
	let origErrorConsole;
	const reservationMock = reservations[1];
	const cancelMock = jest.fn();
	const toggleConfirmMock = jest.fn();
	const confirmMock = jest.fn();

	beforeEach(() => {
		// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
		origErrorConsole = window.console.error;

		window.console.error = (...args) => {
			const firstArg = args.length > 0 && args[0];
			const shouldBeIgnored = firstArg && typeof firstArg === "string" && firstArg.includes("Not implemented: HTMLFormElement.prototype.submit");
			if (!shouldBeIgnored) origErrorConsole(...args);
		};

		// Render component
		render(
			<Router>
				<Reservation details={reservationMock} handleCancel={cancelMock} toggleConfirm={toggleConfirmMock} handleConfirm={confirmMock} />
			</Router>
		);
	});

	afterEach(() => {
		// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
		window.console.error = origErrorConsole;
	});

	test("calls handleCancel when cancel button is clicked", () => {
		const button = screen.getByRole("button", { name: "Cancel reservation" });
		userEvent.click(button);
		expect(cancelMock).toHaveBeenCalledTimes(1);
	});

	test("calls toggleConfirm when confirm button is clicked", () => {
		const button = screen.getByRole("button", { name: "Confirm reservation" });
		userEvent.click(button);
		expect(toggleConfirmMock).toHaveBeenCalledTimes(1);
	});

	test("calls handleConfirm when confirm button is clicked", () => {
		const button = screen.getByRole("button", { name: "Pay" });
		userEvent.click(button);
		expect(confirmMock).toHaveBeenCalledTimes(1);
	});
});
