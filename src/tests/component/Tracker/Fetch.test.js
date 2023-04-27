/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Fetch from "../../../components/Tracker/Fetch";

/* TESTS */
describe("Reservation fetch form", () => {
	let origErrorConsole;
	const submitMock = jest.fn((e) => e.preventDefault());

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
				<Fetch handleSubmit={submitMock} />
			</Router>
		);
	});

	afterEach(() => {
		// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
		window.console.error = origErrorConsole;
	});

	test("calls handleSubmit when track button is clicked", () => {
		const track = screen.getByRole("button", { name: "Track" });
		expect(track).toBeInTheDocument();

		userEvent.click(track);
		expect(submitMock).toHaveBeenCalledTimes(1);
	});
});
