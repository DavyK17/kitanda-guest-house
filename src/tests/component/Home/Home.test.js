/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../../components/Home/Home";

/* TESTS */
describe("Home component", () => {
	beforeEach(() => {
		render(
			<Router>
				<Home dates={{ checkInDate: "", checkOutDate: "" }} />
			</Router>
		);
	});

	test("renders Top", () => {
		const top = screen.getByTestId("home-top");
		expect(top).toBeInTheDocument();
	});

	test("renders About", () => {
		const about = screen.getByTestId("home-about");
		expect(about).toBeInTheDocument();
	});

	test("renders Amenities", () => {
		const amenities = screen.getByTestId("home-amenities");
		expect(amenities).toBeInTheDocument();
	});

	test("renders Contact", () => {
		const contact = screen.getByTestId("home-contact");
		expect(contact).toBeInTheDocument();
	});
});
