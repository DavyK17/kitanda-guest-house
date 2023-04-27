/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import Tracker from "../../../components/Tracker/Tracker";

/* TESTS */
describe("Reservation tracker component", () => {
	beforeEach(() => {
		render(
			<Router>
                <Tracker user={null} />
			</Router>
		);
	});

	test("renders reservation search form", () => {
		const form = screen.getByRole("form");
		expect(form).toBeInTheDocument();
	});

	test("renders initial error message", () => {
		const error = screen.getByText("No reservation found.");
		expect(error).toBeInTheDocument();
	});
});
