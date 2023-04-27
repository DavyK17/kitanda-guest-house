/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckAvailability from "../../../components/Home/CheckAvailability";

/* TESTS */
describe("Check Availability component", () => {
	let origErrorConsole;
	const setDatesMock = jest.fn();
	const submitMock = jest.fn((e) => e.preventDefault());

	beforeEach(() => {
		// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
		origErrorConsole = window.console.error;

		window.console.error = (...args) => {
			const firstArg = args.length > 0 && args[0];
			const shouldBeIgnored = firstArg && typeof firstArg === "string" && firstArg.includes("Not implemented: HTMLFormElement.prototype.submit");
			if (!shouldBeIgnored) origErrorConsole(...args);
		};

		// Set up and render component
		const checkInDate = new Date("2023-05-09").toLocaleDateString("fr-CA");
		const checkOutDate = new Date("2023-05-10").toLocaleDateString("fr-CA");

		render(
			<Router>
				<CheckAvailability dates={{ checkInDate, checkOutDate }} setDates={setDatesMock} handleSubmit={submitMock} />
			</Router>
		);
	});

	afterEach(() => {
		// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
		window.console.error = origErrorConsole;
	});

	test("does not set new minimum departure date if new arrival date is earlier than current departure date", () => {
		const arrival = screen.getByLabelText("Arrival date");
		expect(arrival).toBeInTheDocument();

		userEvent.type(arrival, "2023-05-08");
		expect(setDatesMock).toHaveBeenCalledWith({ checkInDate: "2023-05-08", checkOutDate: "2023-05-10" });
	});

	test("sets new minimum departure date if new arrival date is later than current departure date", () => {
		const arrival = screen.getByLabelText("Arrival date");
		expect(arrival).toBeInTheDocument();

		userEvent.type(arrival, "2023-05-13");
		expect(setDatesMock).toHaveBeenCalledWith({ checkInDate: "2023-05-13", checkOutDate: "2023-05-14" });
	});

	test("updates departure date in state when changed", () => {
		const departure = screen.getByLabelText("Departure date");
		expect(departure).toBeInTheDocument();

		userEvent.type(departure, "2023-05-13");
		expect(setDatesMock).toHaveBeenCalledWith({ checkInDate: "2023-05-09", checkOutDate: "2023-05-13" });
	});

	test("calls handleSubmit when search button is clicked", () => {
		const search = screen.getByRole("button", { name: "Search" });
		expect(search).toBeInTheDocument();

		userEvent.click(search);
		expect(submitMock).toHaveBeenCalledTimes(1);
	});
});
