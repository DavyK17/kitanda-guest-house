/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Addresses from "../../../components/Account/Addresses";
import { addresses } from "../../../util/dataMock";

/* TESTS */
describe("Account addresses component", () => {
	const newMock = jest.fn();
	const backMock = jest.fn();

	beforeEach(() => {
		render(
			<Router>
				<Addresses list={addresses} handleNew={newMock} handleBack={backMock} />
			</Router>
		);
	});

	test("calls handleNew when new address button is clicked", () => {
		const button = screen.getByRole("button", { name: "New address" });
		userEvent.click(button);
		expect(newMock).toHaveBeenCalledTimes(1);
	});

	test("calls handleBack when back button is clicked", () => {
		const button = screen.getByRole("button", { name: "Back to dashboard" });
		userEvent.click(button);
		expect(backMock).toHaveBeenCalledTimes(1);
	});
});
