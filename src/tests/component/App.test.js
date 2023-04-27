/* IMPORTS */
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../../App";

/* TESTS */
describe("App", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
    });

    test("renders Header", () => {
        const header = screen.getByRole("banner");
        expect(header).toBeInTheDocument();
    });

    test("renders main content", () => {
        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();
    });

    test("renders Footer", () => {
        const footer = screen.getByRole("contentinfo");
        expect(footer).toBeInTheDocument();
    });
});