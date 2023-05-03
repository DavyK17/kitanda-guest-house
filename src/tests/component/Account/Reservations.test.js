/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Reservations from "../../../components/Account/Reservations";
import { account, reservations } from "../../../util/dataMock";

/* TESTS */
describe("Account reservations component", () => {
	const backMock = jest.fn();

	beforeEach(() => {
		render(
			<Router>
				<Reservations account={account(true, true)} list={reservations} handleBack={backMock} />
			</Router>
		);
	});

	test("calls handleBack when back button is clicked", () => {
		const button = screen.getByRole("button", { name: "Back to dashboard" });
		userEvent.click(button);
		expect(backMock).toHaveBeenCalledTimes(1);
	});
});
