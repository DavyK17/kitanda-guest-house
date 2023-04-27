/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Reservation from "../../../components/Tracker/Reservation";

import { reservations } from "../../../util/dataMock";

/* TESTS */
// Define reservation test suite template
const testReservation = (pending) => {
	const handleCancelMock = jest.fn((e) => e.preventDefault());
	const toggleConfirmMock = jest.fn((e) => e.preventDefault());
	const handleConfirmMock = jest.fn((e) => e.preventDefault());

	return describe(`${pending ? "Pending" : "Non-pending"} reservation`, () => {
		const reservationMock = pending ? reservations[1] : reservations[0];

		beforeEach(() => {
			render(
				<Router>
					<Reservation details={reservationMock} phone="254712345678" handleCancel={handleCancelMock} toggleConfirm={toggleConfirmMock} handleConfirm={handleConfirmMock} />
				</Router>
			);
		});

		test(`${pending ? "renders" : "does not render"} cancel button${pending ? " and calls handleCancel when clicked" : ""}`, () => {
			const cancel = screen.queryByRole("button", { name: "Cancel reservation" });
			if (pending) {
				expect(cancel).toBeInTheDocument();

				userEvent.click(cancel);
				expect(handleCancelMock).toHaveBeenCalledTimes(1);
			} else {
				expect(cancel).not.toBeInTheDocument();
			}
		});

		test(`${pending ? "renders" : "does not render"} confirm button${pending ? " and calls toggleConfirm when clicked" : ""}`, () => {
			const confirm = screen.queryByRole("button", { name: "Confirm reservation" });
			if (pending) {
				expect(confirm).toBeInTheDocument();

				userEvent.click(confirm);
				expect(toggleConfirmMock).toHaveBeenCalledTimes(1);
			} else {
				expect(confirm).not.toBeInTheDocument();
			}
		});

		test(`${pending ? "renders" : "does not render"} payment form${pending ? " and calls handleConfirm when pay button clicked" : ""}`, () => {
			const form = screen.queryByRole("form");
			if (pending) {
				expect(form).toBeInTheDocument();

				const pay = screen.getByRole("button", { name: "Pay" });
				expect(pay).toBeInTheDocument();

				userEvent.click(pay);
				expect(handleConfirmMock).toHaveBeenCalledTimes(1);
			} else {
				expect(form).not.toBeInTheDocument();
			}
		});
	});
};

// Define tests
describe("Tracker reservation component", () => {
	let origErrorConsole;

	// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
	beforeEach(() => {
		origErrorConsole = window.console.error;

		window.console.error = (...args) => {
			const firstArg = args.length > 0 && args[0];
			const shouldBeIgnored = firstArg && typeof firstArg === "string" && firstArg.includes("Not implemented: HTMLFormElement.prototype.submit");
			if (!shouldBeIgnored) origErrorConsole(...args);
		};
	});

	afterEach(() => {
		window.console.error = origErrorConsole;
	});

    // Pending reservation
    testReservation(true);
    
    // Non-pending reservation
	testReservation(false);
});
