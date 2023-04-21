/* IMPORTS */
import pool from "./pool.js";
import iso3311a2 from "iso-3166-1-alpha-2";

import idGen from "../util/idGen.js";
import sanitizeHtml from "../util/sanitizeHtml.js";
import sendGenericError from "../util/sendGenericError.js";

import pkg from "validator";
const { isNumeric, isLength, trim, escape } = pkg;

/* FUNCTIONS */
export const getAddresses = async (req, res) => {
	// Validate and sanitise user ID
	let userId = trim(req.user.id);
	if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

	try {
		if (req.query.id) {
			// GET ADDRESS BY ID
			// Validate and sanitise address ID
			let id = trim(req.query.id);
			if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 12, max: 12 })) return res.status(400).send("Error: Invalid address ID provided.");

			// Get address
			let text = "SELECT * FROM addresses WHERE id = $1 AND guest_id = $2";
			let result = await pool.query(text, [id, userId]);

			// Send error if address does not exist
			if (result.rows.length === 0) return res.status(404).send("Error: This address does not exist.");

			// Create address object
			let address = {
				id: result.rows[0].id,
				address1: result.rows[0].address1,
				address2: result.rows[0].address2,
				townCity: result.rows[0].town_city,
				countyStateProvince: result.rows[0].county_state_province,
				postcodeZip: result.rows[0].postcode_zip,
				country: result.rows[0].country,
				createdAt: result.rows[0].created_at,
			};

			// Send address
			return res.json(address);
		} else {
			// GET ALL ADDRESSES
			// Create addresses array
			let addresses = [];

			// Get addresses
			let text = "SELECT * FROM addresses WHERE guest_id = $1";
			let result = await pool.query(text, [userId]);

			// Add each address to addresses array
			if (result.rows.length > 0)
				result.rows.forEach(({ id, address1, address2, town_city, county_state_province, postcode_zip, country, created_at }) => {
					let address = {
						id,
						address1,
						address2,
						townCity: town_city,
						countyStateProvince: county_state_province,
						postcodeZip: postcode_zip,
						country,
						createdAt: created_at,
					};
					addresses.push(address);
				});

			// Send addresses array
			return res.json(addresses);
		}
	} catch (err) {
		sendGenericError(res);
	}
};

export const createAddress = async (req, res) => {
	// Generate address ID
	const addressId = idGen(12);

	// VALIDATION AND SANITISATION
	let { reservationId, address1, address2, townCity, countyStateProvince, postcodeZip, country } = req.body;

	// User ID
	let userId = req.user.id ? trim(req.user.id) : null;
	if (userId && (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 }))) return res.status(401).send("Error: Invalid user ID in session.");

	// Reservation ID
	if (reservationId) {
		if (userId) return res.status(403).send("Error: Reservation ID cannot be provided while logged in.");
		if (typeof reservationId !== "string") return res.status(400).send("Error: Reservation ID name must be a string.");
		if (!isNumeric(reservationId, { no_symbols: true }) || !isLength(reservationId, { min: 7, max: 7 })) return res.status(400).send("Error: Invalid reservation ID provided.");
		reservationId = trim(reservationId);
	}

	// Address
	if (typeof address1 !== "string") return res.status(400).send("Error: Address 1 must be a string.");
	address1 = sanitizeHtml(trim(escape(address1)));

	if (address2) {
		if (typeof address2 !== "string") return res.status(400).send("Error: Address 2 must be a string.");
		address2 = sanitizeHtml(trim(escape(address2)));
	}

	// Town/city
	if (typeof townCity !== "string") return res.status(400).send("Error: Town/city must be a string.");
	townCity = sanitizeHtml(trim(escape(townCity)));

	// County/state/province
	if (typeof countyStateProvince !== "string") return res.status(400).send("Error: County/state/province must be a string.");
	countyStateProvince = sanitizeHtml(trim(escape(countyStateProvince)));

	// Postcode/ZIP
	if (typeof postcodeZip !== "string") return res.status(400).send("Error: Postcode/ZIP must be a string.");
	postcodeZip = sanitizeHtml(trim(escape(postcodeZip)));

	// Country
	if (typeof country !== "string") return res.status(400).send("Error: Country (ISO 3166-1 alpha-2 code) must be a string.");
	if (!isLength(country, { min: 2, max: 2 })) return res.status(400).send("Error: Invalid country provided (must be ISO 3166-1 alpha-2 code).");
	country = iso3311a2.getCountry(country);
	if (!country) return res.status(400).send("Error: This country (ISO 3166-1 alpha-2 code) does not exist.");

	try {
		// Add address to database
		let text = `INSERT INTO addresses (id, address1, address2, town_city, county_state_province, postcode_zip, country, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, to_timestamp(${Date.now()} / 1000))`;
		let values = [addressId, address1, address2, townCity, countyStateProvince, postcodeZip, country];
		let result = await pool.query(text, values);

		// Link address to reservation if provided
		if (reservationId) {
			text = `INSERT INTO reservations_address (reservation_id, address_id) VALUES ($1, $2)`;
			values = [reservationId, addressId];
			result = await pool.query(text, values);
		}

		// Link address to user if logged in
		if (userId) result = await pool.query("UPDATE addresses SET guest_id = $1 WHERE id = $2", [userId, addressId]);

		// Send response
		res.status(201).send(`Address created with ID: ${addressId}`);
	} catch (err) {
		sendGenericError(res);
	}
};

export const updateAddress = async (req, res) => {
	// Send error if no address ID provided
	if (!req.query.id) return res.status(400).send("Error: No address ID provided.");

	// VALIDATION AND SANITISATION
	let { address1, address2, townCity, countyStateProvince, postcodeZip, country } = req.body;

	// Address
	if (address1 && typeof address1 !== "string") return res.status(400).send("Error: Address 1 must be a string.");
	if (address2 && typeof address2 !== "string") return res.status(400).send("Error: Address 2 must be a string.");

	// Town/city
	if (townCity && typeof townCity !== "string") return res.status(400).send("Error: Town/city must be a string.");

	// County/state/province
	if (typeof countyStateProvince !== "string") return res.status(400).send("Error: County/state/province must be a string.");

	// Postcode/ZIP
	if (typeof postcodeZip !== "string") return res.status(400).send("Error: Postcode/ZIP must be a string.");
	postcodeZip = sanitizeHtml(trim(escape(postcodeZip)));

	// Country
	if (country) {
		if (typeof country !== "string") return res.status(400).send("Error: Country (ISO 3166-1 alpha-2 code) must be a string.");
		if (!isLength(country, { min: 2, max: 2 })) return res.status(400).send("Error: Invalid country provided (must be ISO 3166-1 alpha-2 code).");
	}

	// Address ID (also sanitised)
	let id = trim(req.query.id);
	if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 12, max: 12 })) return res.status(400).send("Error: Invalid product ID provided.");

	// User ID (also sanitised)
	let userId = trim(req.user.id);
	if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

	try {
		// Get address
		let text = "SELECT * FROM addresses WHERE id = $1 AND guest_id = $2";
		let result = await pool.query(text, [id, userId]);

		// Send error if product does not exist
		if (result.rows.length === 0) return res.status(404).send("Error: This address does not exist.");

		// Save existing details to object
		let old = { ...result.rows[0] };

		// SANITISATION
		// Address
		address1 = sanitizeHtml(trim(escape(address1 || old.address1)));
		address2 = sanitizeHtml(trim(escape(address2 || old.address2)));

		// Town/city
		townCity = sanitizeHtml(trim(escape(townCity || old.town_city)));

		// County/state/province
		countyStateProvince = sanitizeHtml(trim(escape(countyStateProvince || old.county_state_province)));

		// Postcode/ZIP
		postcodeZip = sanitizeHtml(trim(escape(postcodeZip || old.postcode_zip)));

		// Country
		country = iso3311a2.getCountry(country);
		if (!country) return res.status(400).send("Error: This country (ISO 3166-1 alpha-2 code) does not exist.");

		// Send error if no updates made
		if (
			old.address1 === address1 &&
			old.address2 === address2 &&
			old.town_city === townCity &&
			old.county_state_province === countyStateProvince &&
			old.postcode_zip === postcodeZip &&
			old.country === country
		)
			return res.status(400).send("Error: No updates provided.");

		// Update address
		text = "UPDATE addresses SET address1 = $1, address2 = $2, town_city = $3, county_state_province = $4, postcode_zip = $5, country = $6 WHERE id = $7 RETURNING id";
		let values = [address1, address2, townCity, countyStateProvince, postcodeZip, country, id];
		result = await pool.query(text, values);
		res.status(200).send(`Address updated with ID: ${result.rows[0].id}`);
	} catch (err) {
		sendGenericError(res);
	}
};

export const deleteAddress = async (req, res) => {
	// Send error if no address ID provided
	if (!req.query.id) return res.status(400).send("Error: No address ID provided.");

	// VALIDATION AND SANITISATION
	// Address ID
	let id = trim(req.query.id);
	if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 12, max: 12 })) return res.status(400).send("Error: Invalid product ID provided.");

	// User ID
	let userId = trim(req.user.id);
	if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

	try {
		// Get address
		let text = "SELECT * FROM addresses WHERE id = $1 AND guest_id = $2";
		let result = await pool.query(text, [id, userId]);

		// Send error if address does not exist
		if (result.rows.length === 0) return res.status(404).send("Error: This address does not exist.");

		// Get all addresses
		text = "SELECT * FROM addresses WHERE guest_id = $1";
		result = await pool.query(text, [userId]);

		// Send error if address is the only one remaining in account
		if (result.rows.length === 1 && result.rows[0].id === id) return res.status(403).send("Error: You must have at least one address linked to your account.");

		// Delete address
		result = await pool.query("DELETE FROM addresses WHERE id = $1 AND guest_id = $2", [id, userId]);
		res.status(204).send("Address deleted successfully");
	} catch (err) {
		sendGenericError(res);
	}
};
