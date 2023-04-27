/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "../../../components/Auth/Form";

import capitalise from "../../../util/capitalise";

/* TESTS */
// Define test suite template
const testView = (view, title = null) => {
	// Define mock variables
	const ctprMock = view === "ctpr" ? true : false;
	const hasAccountMock = view === "register" ? false : true;
	const submitMock = jest.fn((e) => e.preventDefault());
	const toggleHasAccountMock = jest.fn();

	// Return test suite
	return describe(`${title || capitalise(view)} view`, () => {
		beforeEach(() => {
			render(
				<Router>
					<Form ctpr={ctprMock} hasAccount={hasAccountMock} toggleHasAccount={toggleHasAccountMock} handleSubmit={submitMock} />
				</Router>
			);
		});

		test(`${view === "register" ? "renders" : "does not render"} name fields`, () => {
			let title = screen.queryByLabelText("Title");
			view === "register" ? expect(title).toBeInTheDocument() : expect(title).not.toBeInTheDocument();

			let firstName = screen.queryByLabelText("First name*");
			view === "register" ? expect(firstName).toBeInTheDocument() : expect(firstName).not.toBeInTheDocument();

			let lastName = screen.queryByLabelText("Last name*");
			view === "register" ? expect(lastName).toBeInTheDocument() : expect(lastName).not.toBeInTheDocument();

			let companyName = screen.queryByLabelText("Company name");
			view === "register" ? expect(companyName).toBeInTheDocument() : expect(companyName).not.toBeInTheDocument();
		});

		test(`${view === "login" ? "does not render" : "renders"} address fields`, () => {
			let address1 = screen.queryByLabelText("Address 1*");
			view === "login" ? expect(address1).not.toBeInTheDocument() : expect(address1).toBeInTheDocument();

			let address2 = screen.queryByLabelText("Address 2");
			view === "login" ? expect(address2).not.toBeInTheDocument() : expect(address2).toBeInTheDocument();

			let townCity = screen.queryByLabelText("Town/city*");
			view === "login" ? expect(townCity).not.toBeInTheDocument() : expect(townCity).toBeInTheDocument();

			let countyStateProvince = screen.queryByLabelText("County/State/Province");
			view === "login" ? expect(countyStateProvince).not.toBeInTheDocument() : expect(countyStateProvince).toBeInTheDocument();

			let postcodeZip = screen.queryByLabelText("Postcode/ZIP*");
			view === "login" ? expect(postcodeZip).not.toBeInTheDocument() : expect(postcodeZip).toBeInTheDocument();

			let country = screen.queryByLabelText("Country*");
			view === "login" ? expect(country).not.toBeInTheDocument() : expect(country).toBeInTheDocument();
		});

		test(`${view === "register" ? "renders" : "does not render"} phone number field`, () => {
			let phone = screen.queryByLabelText("Phone number");
			view === "register" ? expect(phone).toBeInTheDocument() : expect(phone).not.toBeInTheDocument();
		});

		test(`${view === "ctpr" ? "does not render" : "renders"} email address field`, () => {
			let email = screen.queryByLabelText(`Email address${view === "login" ? "" : "*"}`);
			view === "ctpr" ? expect(email).not.toBeInTheDocument() : expect(email).toBeInTheDocument();
		});

		test("renders password field", () => {
			let password = screen.queryByLabelText(`Password${view === "login" ? "" : "*"}`);
			expect(password).toBeInTheDocument();
		});

		test(`${view === "login" ? "does not render" : "renders"} confirm password field`, () => {
			let confirmPassword = screen.queryByLabelText("Confirm password*");
			view === "login" ? expect(confirmPassword).not.toBeInTheDocument() : expect(confirmPassword).toBeInTheDocument();
		});

		test(`${view === "ctpr" ? "does not render" : "renders"} third-party authentication options`, () => {
			let providers = ["google", "facebook"];
			providers.forEach((provider) => {
				let link = screen.queryByTitle(`Authenticate with ${capitalise(provider)}`);
				view === "ctpr" ? expect(link).not.toBeInTheDocument() : expect(link).toBeInTheDocument();
			});
		});

		test("renders submit button and calls handleSubmit when clicked", () => {
			const name = (type) => {
				if (type === "login") return "Sign in";
				if (type === "register") return "Sign up";
				if (type === "ctpr") return "Submit";
			};

			let submit = screen.queryByRole("button", { name: name(view) });
			expect(submit).toBeInTheDocument();

            userEvent.click(submit);
            expect(submitMock).toHaveBeenCalledTimes(1);
		});

		test(`${view === "ctpr" ? "does not render" : "renders"} instead button and calls toggleHasAccount when clicked`, () => {
			const name = `Sign ${view === "login" ? "up" : "in"} instead`;
            let instead = screen.queryByRole("button", { name });
            
            if (view === "ctpr") {
                expect(instead).not.toBeInTheDocument()
            } else {
                expect(instead).toBeInTheDocument();
                userEvent.click(instead);
                expect(toggleHasAccountMock).toHaveBeenCalledTimes(1);
            }
		});
	});
};

// Define tests
describe("Authentication form component", () => {
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
    
    // Tests
	testView("login");
	testView("register");
	testView("ctpr", "CTPR");
});
