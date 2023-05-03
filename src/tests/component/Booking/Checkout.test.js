/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkout from "../../../components/Booking/Checkout";

import capitalise from "../../../util/capitalise";
import { user, addresses } from "../../../util/dataMock";

/* TESTS */
// Define test suite template
const testView = (view) => {
	// Define mock variables
    const userMock = view === "authenticated" ? user(true, true) : null;
	const submitMock = jest.fn();

	// Return test suite
	return describe(`${capitalise(view)} view`, () => {
		beforeEach(() => {
			render(
				<Router>
                    <Checkout user={userMock} addresses={addresses} handleSubmit={submitMock} />
				</Router>
			);
		});

		test(`${view === "authenticated" ? "does not render" : "renders"} address fields`, () => {
			const address1 = screen.queryByLabelText("Address 1*");
			view === "authenticated" ? expect(address1).not.toBeInTheDocument() : expect(address1).toBeInTheDocument();

			const address2 = screen.queryByLabelText("Address 2");
			view === "authenticated" ? expect(address2).not.toBeInTheDocument() : expect(address2).toBeInTheDocument();

			const townCity = screen.queryByLabelText("Town/city*");
			view === "authenticated" ? expect(townCity).not.toBeInTheDocument() : expect(townCity).toBeInTheDocument();

			const countyStateProvince = screen.queryByLabelText("County/State/Province");
			view === "authenticated" ? expect(countyStateProvince).not.toBeInTheDocument() : expect(countyStateProvince).toBeInTheDocument();

			const postcodeZip = screen.queryByLabelText("Postcode/ZIP*");
			view === "authenticated" ? expect(postcodeZip).not.toBeInTheDocument() : expect(postcodeZip).toBeInTheDocument();

			const country = screen.queryByLabelText("Country*");
            view === "authenticated" ? expect(country).not.toBeInTheDocument() : expect(country).toBeInTheDocument();
            
            const addressSelect = screen.queryByLabelText("Address");
            view === "authenticated" ? expect(addressSelect).toBeInTheDocument() : expect(addressSelect).not.toBeInTheDocument();
		});

		test("renders contact fields", () => {
			const phone = screen.queryByLabelText("Phone number*");
            expect(phone).toBeInTheDocument();
            
			const email = screen.queryByLabelText("Email address*");
			expect(email).toBeInTheDocument();
		});

		test("renders privacy policy checkbox", () => {
			const agree = screen.queryByLabelText("I have read and agreed to the Non-Existent Privacy Policy.");
			expect(agree).toBeInTheDocument();
        });
        
        test("calls handleSubmit when checkout button is clicked", () => {
            const button = screen.getByRole("button", { name: "Checkout" });
            userEvent.click(button);
            expect(submitMock).toHaveBeenCalledTimes(1);
        })
	});
};

// Define tests
describe("Booking checkout component", () => {
	// Workaround for "Not implemented: HTMLFormElement.prototype.submit" error
    let origErrorConsole;
    
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
    
    // Tests
	testView("authenticated");
	testView("unauthenticated");
});
