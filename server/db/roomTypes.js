/* IMPORTS */
import pool from "./pool.js";
import sendGenericError from "../util/sendGenericError.js";

import sanitizeHtml from "../util/sanitizeHtml.js";
import pkg from "validator";
const { isDate, isNumeric, isLength, trim, escape } = pkg;

/* FUNCTIONS */
export const getRoomTypes = async (req, res) => {
	try {
		if (req.query.id) {
			// GET TYPE BY ID
			// Validate and sanitise product ID
			let id = trim(req.query.id);
			if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 1, max: 1 })) return res.status(400).send("Error: Invalid room type ID provided.");

			// Get room type
			let result = await pool.query("SELECT id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night FROM room_types WHERE id = $1", [id]);

			// Send error if room type does not exist
			if (result.rows.length === 0) return res.status(404).send("Error: This room type does not exist.");

			// Send room type
			res.json({
				id: result.rows[0].id,
				name: result.rows[0].name,
				features: result.rows[0].features,
				numOfAdults: result.rows[0].num_of_adults,
				numOfChildren: result.rows[0].num_of_children,
				numOfInfants: result.rows[0].num_of_infants,
				pricePerNight: result.rows[0].price_per_night,
			});
		} else {
			// GET ALL ROOM TYPES
			let result = await pool.query("SELECT id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night FROM room_types ORDER BY price_per_night ASC");
			let roomTypes = [];

			result.rows.forEach(({ id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night }) => {
				roomTypes.push({
					id,
					name,
					features,
					numOfAdults: num_of_adults,
					numOfChildren: num_of_children,
					numOfInfants: num_of_infants,
					pricePerNight: price_per_night,
				});
			});
			res.json(roomTypes);
		}
	} catch (err) {
		sendGenericError(res);
	}
};

export const getAvailableRoomTypes = async (req, res) => {
	// VALIDATION AND SANITISATION
	let { checkInDate, checkOutDate } = req.query;

	// Check-in date
	if (typeof checkInDate !== "string") return res.status(400).send("Error: Check-in date must be a string.");
	checkInDate = sanitizeHtml(trim(escape(checkInDate)));
	if (!isDate(checkInDate)) return res.status(400).send("Error: Invalid check-in date provided.");
	if (new Date(checkInDate) < new Date(Date.now() + 24 * 60 * 60 * 1000)) return res.status(400).send("Error: Check-in date cannot be earlier than tomorrow.");

	// Check-out date
	if (typeof checkOutDate !== "string") return res.status(400).send("Error: Check-out date must be a string.");
	checkOutDate = sanitizeHtml(trim(escape(checkOutDate)));
	if (!isDate(checkOutDate)) return res.status(400).send("Error: Invalid check-out date provided.");
	if (new Date(checkOutDate) <= new Date(checkInDate)) return res.status(400).send("Error: Check-out date cannot be earlier than or equal to check-in date.");

	try {
		// Create room types array
		let roomTypes = [];

		// Get room types
		let text =
			"WITH available_room_types AS ( SELECT room_type_id FROM rooms WHERE id NOT IN ( SELECT room_id FROM reservations_rooms JOIN reservations ON reservations_rooms.reservation_id = reservations.id JOIN rooms ON reservations_rooms.room_id = rooms.id WHERE reservations.checkin_date <= $1 AND reservations.checkout_date >= $2 ) GROUP BY room_type_id ORDER BY room_type_id ) SELECT id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night FROM room_types JOIN available_room_types ON available_room_types.room_type_id = room_types.id";
		let values = [checkInDate, checkOutDate];
		let result = await pool.query(text, values);

		// Add each available room type to room types array
		if (result.rows.length > 0)
			result.rows.forEach(({ id, name, features, num_of_adults, num_of_children, num_of_infants, price_per_night }) => {
				roomTypes.push({
					id,
					name,
					features,
					numOfAdults: num_of_adults,
					numOfChildren: num_of_children,
					numOfInfants: num_of_infants,
					pricePerNight: price_per_night,
				});
			});

		// Send room types array
		res.json(roomTypes);
	} catch (err) {
		sendGenericError(res);
	}
};
