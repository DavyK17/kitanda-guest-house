/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditAddress from "../../../components/Account/EditAddress";
import { addresses } from "../../../util/dataMock";

/* TESTS */
describe("Account address edit component", () => {
	let origErrorConsole;
    const addressMock = addresses[0];
    const backMock = jest.fn();
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
                <EditAddress operation="edit" address={addressMock} handleBack={backMock} handleSubmit={submitMock} />
			</Router>
		);
    });

	afterEach(() => {
		// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
		window.console.error = origErrorConsole;
	});
    
    test("calls handleBack when back button is clicked", () => {
        const button = screen.getByRole("button", { name: "Back to addresses" });
        userEvent.click(button);
        expect(backMock).toHaveBeenCalledTimes(1);
    });
    
    test("calls handleSubmit when save button is clicked", () => {
        const button = screen.getByRole("button", { name: "Save address" });
        userEvent.click(button);
        expect(submitMock).toHaveBeenCalledTimes(1);
    });
});
