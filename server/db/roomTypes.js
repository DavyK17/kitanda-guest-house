/* IMPORTS */
import pool from "./pool.js";
import sendGenericError from "../util/sendGenericError.js";

import pkg from "validator";
const { isNumeric, isLength, trim } = pkg;

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
