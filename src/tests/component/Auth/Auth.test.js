/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Auth from "../../../components/Auth/Auth";

/* TESTS */
describe("Auth component", () => {
	beforeEach(() => {
		render(
			<Router>
				<Auth />
			</Router>
		);
	});

	test("renders authentication form", () => {
		const form = screen.getByRole("form");
		expect(form).toBeInTheDocument();
	});
});
