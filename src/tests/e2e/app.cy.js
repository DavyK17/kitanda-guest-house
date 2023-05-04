/* IMPORTS */
import dotenv from "dotenv";

/* TESTS */
dotenv.config();
describe("Customer", () => {
	before(async () => {
		const response = await cy.request({ method: "POST", url: "/api/db/seed", body: { seedSecret: process.env.SEED_SECRET } });
		expect(response.status).to.eq(200);
	});

	beforeEach(() => {
		// Visit home page
		cy.visit("/");
	});

	it("can make a reservation", () => {
		cy.wait(3000);
	});
});
