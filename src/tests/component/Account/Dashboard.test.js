/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dashboard from "../../../components/Account/Dashboard";

import * as apiAccount from "../../../api/Account";
import * as apiAddresses from "../../../api/Addresses";
import * as apiReservations from "../../../api/Reservations";

import capitalise from "../../../util/capitalise";
import { account, addresses, reservations } from "../../../util/dataMock";

/* TESTS */
describe("Account dashboard component", () => {
    const accountMock = account(true, true);

    const unlinkMock = jest.fn();
    const signOutMock = jest.fn();
    const deleteAccountMock = jest.fn();

    const mockGetUser = jest.spyOn(apiAccount, "getUser");
    const mockGetAddresses = jest.spyOn(apiAddresses, "getAddresses");
    const mockGetReservations = jest.spyOn(apiReservations, "getReservations");

	beforeEach(() => {
        mockGetUser.mockResolvedValue(accountMock);
        mockGetAddresses.mockResolvedValue(addresses);
        mockGetReservations.mockResolvedValue(reservations);

		render(
			<Router>
                <Dashboard account={accountMock} isLoading={false} error={false} handleUnlink={unlinkMock} handleSignOut={signOutMock} handleDelete={deleteAccountMock} />
			</Router>
		);
    });
    
    test("calls handleUnlink when unlink button is clicked", () => {
        const providers = ["facebook", "google"];
        providers.forEach((provider) => {
            const button = screen.queryByTitle(`Unlink ${capitalise(provider)} account`);
            userEvent.click(button);
            expect(unlinkMock).toHaveBeenCalled();
        });
    });
});
