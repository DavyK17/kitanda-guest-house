/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../../components/Header/Header";

import { user } from "../../../util/dataMock";

/* TESTS */
describe("Header component", () => {
	describe("Unauthenticated", () => {
		beforeEach(() => {
			render(
				<Router>
					<Header />
				</Router>
			);
		});

		test("renders logo", () => {
			let logo = screen.queryByRole("img", { name: "Logo" });
			expect(logo).toBeInTheDocument();
		});

		test("renders navigation", () => {
			let nav = screen.queryByRole("navigation");
			expect(nav).toBeInTheDocument();
		});

		describe("renders links", () => {
			test("Home", () => {
				let link = screen.queryByRole("link", { name: "Home" });
				expect(link).toBeInTheDocument();
			});

			test("Gallery", () => {
				let link = screen.queryByRole("link", { name: "Gallery" });
				expect(link).toBeInTheDocument();
			});

			test("Booking", () => {
				let link = screen.queryByRole("link", { name: "Booking" });
				expect(link).toBeInTheDocument();
			});

			test("Tracker", () => {
				let link = screen.queryByRole("link", { name: "Tracker" });
				expect(link).toBeInTheDocument();
			});

			test("Sign in", () => {
				let link = screen.queryByRole("link", { name: "Sign in" });
				expect(link).toBeInTheDocument();
			});
		});

		describe("does not render link", () => {
			test("Account", () => {
				let link = screen.queryByRole("link", { name: "Account" });
				expect(link).not.toBeInTheDocument();
			});
		});
	});

	describe("Authenticated", () => {
		let userMock = user();

		beforeEach(() => {
			render(
				<Router>
					<Header user={userMock} />
				</Router>
			);
		});

		test("renders logo", () => {
			let logo = screen.queryByRole("img", { name: "Logo" });
			expect(logo).toBeInTheDocument();
		});

		test("renders navigation", () => {
			let nav = screen.queryByRole("navigation");
			expect(nav).toBeInTheDocument();
		});

		describe("renders links", () => {
			test("Home", () => {
				let link = screen.queryByRole("link", { name: "Home" });
				expect(link).toBeInTheDocument();
			});

			test("Gallery", () => {
				let link = screen.queryByRole("link", { name: "Gallery" });
				expect(link).toBeInTheDocument();
			});

			test("Booking", () => {
				let link = screen.queryByRole("link", { name: "Booking" });
				expect(link).toBeInTheDocument();
			});

			test("Account", () => {
				let link = screen.queryByRole("link", { name: "Account" });
				expect(link).toBeInTheDocument();
			});
		});

		describe("does not render links", () => {
			test("Tracker", () => {
				let link = screen.queryByRole("link", { name: "Tracker" });
				expect(link).not.toBeInTheDocument();
			});

			test("Sign in", () => {
				let link = screen.queryByRole("link", { name: "Sign in" });
				expect(link).not.toBeInTheDocument();
			});
		});
	});
});
