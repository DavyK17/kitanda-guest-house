/* IMPORTS */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Address from "../../../components/Account/Address";
import { addresses } from "../../../util/dataMock";

/* TESTS */
describe("Account address component", () => {
    const addressMock = addresses[0];

    const editMock = jest.fn();
    const deleteMock = jest.fn();

	beforeEach(() => {
		render(
			<Router>
                <Address address={addressMock} handleEdit={editMock} handleDelete={deleteMock} />
			</Router>
		);
    });
    
    test("calls handleEdit when edit button is clicked", () => {
        const button = screen.getByRole("button", { name: "Edit" });
        userEvent.click(button);
        expect(editMock).toHaveBeenCalledTimes(1);
    });
    
    test("calls handleDelete when delete button is clicked", () => {
        const button = screen.getByRole("button", { name: "Delete" });
        userEvent.click(button);
        expect(deleteMock).toHaveBeenCalledTimes(1);
    });
});
