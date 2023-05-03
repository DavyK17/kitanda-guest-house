/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Details from "../../../components/Account/Details";
import { account } from "../../../util/dataMock";

/* TESTS */
describe("Account details component", () => {
	let origErrorConsole;
    const accountMock = account(true, true);
    const submitMock = jest.fn();

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
                <Details account={accountMock} handleSubmit={submitMock} />
			</Router>
		);
    });

	afterEach(() => {
		// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
		window.console.error = origErrorConsole;
	});
    
    test("calls handleSubmit when save button is clicked", () => {
        const button = screen.getByRole("button", { name: "Save details" });
        userEvent.click(button);
        expect(submitMock).toHaveBeenCalledTimes(1);
    });
});
