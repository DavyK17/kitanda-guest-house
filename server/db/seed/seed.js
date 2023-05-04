/* IMPORTS */
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

import pool from "../pool.js";
import sendGenericError from "../../util/sendGenericError.js";

/* CONFIGURATION */
dotenv.config();

/* FUNCTIONS */
export const seedDatabase = async (req, res) => {
	const parsedData = JSON.parse(readFileSync(join(process.cwd(), "server", "db", "seed", "data.json"), "utf-8"));

	// Validate seed secret
	const { seedSecret } = req.body;
	if (seedSecret !== process.env.SEED_SECRET) return res.status(400).send("Error: Invalid seed secret provided.");

	try {
		// Define tables array
		const tables = ["reservations_rooms", "reservations", "addresses", "federated_credentials", "user_sessions", "guests", "rooms", "room_types", "login_attempts"];

		// Delete existing data from tables
		for (const table of tables) await pool.query(`DELETE FROM ${table}`);

		// Insert seed data to tables
		for (const guest of parsedData.guests) {
			const { id, title, first_name, last_name, company_name, phone, email, password, created_at } = guest;

			let text = `INSERT INTO guests (id, title, first_name, last_name, company_name, phone, email, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
			let values = [id, title, first_name, last_name, company_name, phone, email, password, created_at];

			await pool.query(text, values);
		}

		for (const address of parsedData.addresses) {
			const { id, address1, address2, town_city, county_state_province, postcode_zip, country, created_at, guest_id } = address;

			let text = `INSERT INTO addresses (id, address1, address2, town_city, county_state_province, postcode_zip, country, created_at, guest_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
			let values = [id, address1, address2, town_city, county_state_province, postcode_zip, country, created_at, guest_id];

			await pool.query(text, values);
		}

		for (const roomType of parsedData.roomTypes) {
			const { id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night } = roomType;

			let text = `INSERT INTO room_types (id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
			let values = [id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night];

			await pool.query(text, values);
		}

		for (const room of parsedData.rooms) {
			const { id, room_type_id, room_number, created_at } = room;

			let text = `INSERT INTO rooms (id, room_type_id, room_number, created_at) VALUES ($1, $2, $3, $4)`;
			let values = [id, room_type_id, room_number, created_at];

			await pool.query(text, values);
		}

		// Send confirmation
		res.status(200).send("Database seeded successfully");
	} catch (err) {
		console.log(err);
		sendGenericError(res);
	}
};
