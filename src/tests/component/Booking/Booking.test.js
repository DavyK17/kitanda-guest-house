/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import Booking from "../../../components/Booking/Booking";

import * as apiAccount from "../../../api/Account";
import * as apiAddresses from "../../../api/Addresses";

import { account, addresses, roomTypes } from "../../../util/dataMock";

/* TESTS */
describe("Booking component", () => {
	const datesMock = { checkInDate: null, checkOutDate: null };
	const mockGetUser = jest.spyOn(apiAccount, "getUser");
	const mockGetAddresses = jest.spyOn(apiAddresses, "getAddresses");

	test("renders skeleton during API call", async () => {
		render(
			<Router>
				<Booking dates={datesMock} cart={[]} />
			</Router>
		);
		await waitForElementToBeRemoved(() => screen.queryByTestId("booking-room-select-loading"));
	});

	test("renders error message if API call fails", async () => {
		mockGetUser.mockRejectedValueOnce(new Error("An unknown error occurred. Kindly try again."));

		render(
			<Router>
				<Booking dates={datesMock} cart={[]} />
			</Router>
		);
		await waitForElementToBeRemoved(() => screen.queryByTestId("booking-room-select-loading"));

		const error = screen.queryByText("An error occurred loading room types. Kindly refresh the page and try again.");
		expect(error).toBeInTheDocument();
	});

	describe("if API call succeeds", () => {
		describe("Default", () => {
			beforeEach(async () => {
				mockGetUser.mockResolvedValueOnce(account(false));
				mockGetAddresses.mockResolvedValueOnce(addresses);

				render(
					<Router>
						<Booking dates={datesMock} cart={[]} />
					</Router>
				);

				await waitForElementToBeRemoved(() => screen.queryByTestId("booking-room-select-loading"));
			});

			test("does not render room type sort component", () => {
				const roomTypeSort = screen.queryByTestId("booking-room-type-sort");
				expect(roomTypeSort).not.toBeInTheDocument();
			});

			test("renders rooms section", () => {
				const rooms = screen.queryByTestId("booking-rooms");
				expect(rooms).toBeInTheDocument();
			});

			test("renders cart component", () => {
				const cart = screen.queryByTestId("booking-cart");
				expect(cart).toBeInTheDocument();
			});

			test("does not render checkout component", () => {
				const checkout = screen.queryByTestId("booking-checkout");
				expect(checkout).not.toBeInTheDocument();
			});
		});

		describe("Room types displayed", () => {
			beforeEach(async () => {
				mockGetUser.mockResolvedValueOnce(account(false));
				mockGetAddresses.mockResolvedValueOnce(addresses);

				render(
					<Router>
						<Booking dates={datesMock} cart={[]} roomTypes={roomTypes} items={roomTypes} />
					</Router>
				);

				await waitForElementToBeRemoved(() => screen.queryByTestId("booking-room-select-loading"));
			});

			test("renders room type sort component", () => {
				const roomTypeSort = screen.queryByTestId("booking-room-type-sort");
				expect(roomTypeSort).toBeInTheDocument();
			});

			test("renders rooms section", () => {
				const rooms = screen.queryByTestId("booking-rooms");
				expect(rooms).toBeInTheDocument();
			});

			test("renders cart component", () => {
				const cart = screen.queryByTestId("booking-cart");
				expect(cart).toBeInTheDocument();
			});

			test("does not render checkout component", () => {
				const checkout = screen.queryByTestId("booking-checkout");
				expect(checkout).not.toBeInTheDocument();
			});
		});
	});
});
