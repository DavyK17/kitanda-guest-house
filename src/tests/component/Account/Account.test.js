/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import Account from "../../../components/Account/Account";

import * as apiAccount from "../../../api/Account";
import * as apiAddresses from "../../../api/Addresses";
import * as apiReservations from "../../../api/Reservations";

import capitalise from "../../../util/capitalise";
import { account, addresses, reservations } from "../../../util/dataMock";

/* TESTS */
describe("Account component", () => {
	describe("General", () => {
		test("renders status", async () => {
			render(
				<Router>
					<Account />
				</Router>
			);
			await waitForElementToBeRemoved(() => screen.queryByTestId("account-dashboard-loading"));

			const status = screen.getByTestId("status");
			expect(status).toBeInTheDocument();
		});
	});

	describe("Dashboard", () => {
		const mockGetUser = jest.spyOn(apiAccount, "getUser");
		const mockGetAddresses = jest.spyOn(apiAddresses, "getAddresses");
		const mockGetReservations = jest.spyOn(apiReservations, "getReservations");

		test("renders skeleton during API call", async () => {
			render(
				<Router>
					<Account />
				</Router>
			);
			await waitForElementToBeRemoved(() => screen.queryByTestId("account-dashboard-loading"));
		});

		test("renders error message if API call fails", async () => {
			mockGetUser.mockRejectedValueOnce(new Error("An unknown error occurred. Kindly try again."));

			render(
				<Router>
					<Account />
				</Router>
			);
			await waitForElementToBeRemoved(() => screen.queryByTestId("account-dashboard-loading"));

			const error = screen.queryByText("An error occurred loading your dashboard. Kindly refresh the page and try again.");
			expect(error).toBeInTheDocument();
		});

		describe("if API call succeeds", () => {
			beforeEach(async () => {
				mockGetUser.mockResolvedValueOnce(account(false));
				mockGetAddresses.mockResolvedValueOnce(addresses);
				mockGetReservations.mockResolvedValueOnce(reservations);

				render(
					<Router>
						<Account />
					</Router>
				);

				await waitForElementToBeRemoved(() => screen.queryByTestId("account-dashboard-loading"));
			});

			test("renders account ID", () => {
				const id = screen.queryByTestId("account-id");
				expect(id).toBeInTheDocument();
			});

			test("renders names", () => {
				const names = screen.queryByTestId("account-names");
				expect(names).toBeInTheDocument();
			});

			test("renders company name", () => {
				const company = screen.queryByTestId("account-company-name");
				expect(company).toBeInTheDocument();
			});

			test("renders phone number", () => {
				const phone = screen.queryByTestId("account-phone");
				expect(phone).toBeInTheDocument();
			});

			test("renders email address", () => {
				const email = screen.queryByTestId("account-email");
				expect(email).toBeInTheDocument();
			});

			test("renders third-party link/unlink buttons", () => {
				const thirdParty = screen.queryByTestId("account-third-party");
				expect(thirdParty).toBeInTheDocument();

				const providers = ["facebook", "google"];
				providers.forEach((provider) => {
					const link = screen.queryByTitle(`Link ${capitalise(provider)} account`);
					expect(link).toBeInTheDocument();
				});
			});

			test("renders navigation button for addresses", () => {
				const button = screen.getByRole("button", { name: "Manage addresses" });
				expect(button).toBeInTheDocument();
			});

			test("renders navigation button for reservations", () => {
				const button = screen.getByRole("button", { name: "View reservations" });
				expect(button).toBeInTheDocument();
			});

			test("renders navigation button for editing details", () => {
				const button = screen.getByRole("button", { name: "Edit details" });
				expect(button).toBeInTheDocument();
			});

			test("renders button to sign out", () => {
				const button = screen.getByRole("button", { name: "Sign out" });
				expect(button).toBeInTheDocument();
			});

			test("renders button to delete account", () => {
				const button = screen.getByRole("button", { name: "Delete account" });
				expect(button).toBeInTheDocument();
			});
		});
	});
});
