/* IMPORTS */
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../../../App";

/* TESTS */
describe("Error page", () => {
    test("displays on non-existent route", () => {
        render(
            <MemoryRouter initialEntries={["/nope"]}>
                <App />
            </MemoryRouter>
        );
        
        const notFound = screen.getByTestId("not-found");
        expect(notFound).toBeInTheDocument();
    });
});