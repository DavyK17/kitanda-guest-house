/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Top from "../../../components/Home/Top";

/* TESTS */
describe("Home top component", () => {
	beforeEach(() => {
		render(
			<Router>
				<Top dates={{ checkInDate: "", checkOutDate: "" }} />
			</Router>
		);
	});

	test("renders image carousel", () => {
		const carousel = screen.getByTestId("home-carousel");
		expect(carousel).toBeInTheDocument();
	});

	test("renders room availability check", () => {
		const checkAvailability = screen.getByRole("form");
		expect(checkAvailability).toBeInTheDocument();
	});
});
