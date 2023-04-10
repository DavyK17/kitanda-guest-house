/* IMPORTS */
import axios from "axios";
import dotenv from "dotenv";
import pkg from "validator";
import pool from "./pool.js";

import checkPhone from "../util/checkPhone.js";
import idGen from "../util/idGen.js";
import sanitizeHtml from "../util/sanitizeHtml.js";
import sendGenericError from "../util/sendGenericError.js";

dotenv.config();
const { isDate, isEmail, isNumeric, isLength, trim, escape, normalizeEmail } = pkg;

/* FUNCTIONS */
export const getReservations = async (req, res) => {
	// Do the following if user is logged in
	if (req.user) {
		// Validate and sanitise user ID
		let userId = trim(req.user.id);
		if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

		try {
			if (req.query.id) {
				// GET USER RESERVATION BY ID
				// Validate and sanitise reservation ID
				let id = trim(req.query.id);
				if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 7, max: 7 })) return res.status(400).send("Error: Invalid reservation ID provided.");

				// Get reservation
				let result = await pool.query("SELECT id, checkin_date, checkout_date, total_price, created_at, status FROM reservations WHERE id = $1 AND guest_id = $2", [id, userId]);

				// Send error if reservation does not exist
				if (result.rows.length === 0) return res.status(404).send("Error: This reservation does not exist.");

				// Create reservation object
				let reservation = {
					id: result.rows[0].id,
					checkInDate: result.rows[0].checkin_date,
					checkOutDate: result.rows[0].checkout_date,
					totalPrice: result.rows[0].total_price,
					createdAt: result.rows[0].created_at,
					status: result.rows[0].status,
					rooms: [],
				};

				// Add each room in reservation to rooms array in reservation object
				result = await pool.query(
					"SELECT room_id, num_of_adults, num_of_children, num_of_infants FROM reservations_rooms JOIN reservations ON reservations.id = reservations_rooms.reservation_id WHERE reservations_rooms.reservation_id = $1",
					[id]
				);
				result.rows.forEach(({ room_id, num_of_adults, num_of_children, num_of_infants }) => {
					let item = { roomId: room_id, numOfAdults: num_of_adults, numOfChildren: num_of_children, numOfInfants: num_of_infants };
					reservation.rooms.push(item);
				});

				// Send reservation
				return res.json(reservation);
			} else {
				// GET ALL USER RESERVATIONS
				// Create reservations array
				let reservations = [];

				// Get reservations
				let result = await pool.query("SELECT * FROM reservations WHERE guest_id = $1 ORDER BY created_at DESC", [userId]);

				// Add each reservation to reservations array
				if (result.rows.length > 0)
					result.rows.forEach(({ id, checkin_date, checkout_date, total_price, created_at, status }) => {
						let reservation = { id, checkInDate: checkin_date, checkOutDate: checkout_date, totalPrice: total_price, createdAt: created_at, status };
						reservations.push(reservation);
					});

				// Send reservations array
				return res.json(reservations);
			}
		} catch (err) {
			sendGenericError(res);
		}
	}

	// GET RESERVATION FROM EMAIL BY ID
	let { email, id } = req.query;

	// Email
	if (typeof email !== "string") return res.status(400).send("Error: Email must be a string.");
	email = sanitizeHtml(normalizeEmail(trim(escape(email)), { gmail_remove_dots: false }));
	if (!isEmail(email)) return res.status(400).send("Error: Invalid email provided.");

	// Reservation ID
	id = trim(id);
	if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 7, max: 7 })) return res.status(400).send("Error: Invalid reservation ID provided.");

	try {
		// Get reservation
		let result = await pool.query("SELECT * FROM reservations WHERE id = $1 AND email = $2", [id, email]);

		// Send error if reservation does not exist
		if (result.rows.length === 0) return res.status(404).send("Error: This reservation does not exist.");

		// Create reservation object
		let reservation = {
			id: result.rows[0].id,
			email: result.rows[0].email,
			checkInDate: result.rows[0].checkin_date,
			checkOutDate: result.rows[0].checkout_date,
			totalPrice: result.rows[0].total_price,
			createdAt: result.rows[0].created_at,
			status: result.rows[0].status,
			rooms: [],
		};

		// Add each room in reservation to rooms array in reservation object
		result = await pool.query(
			"SELECT room_id, num_of_adults, num_of_children, num_of_infants FROM reservations_rooms JOIN reservations ON reservations.id = reservations_rooms.reservation_id WHERE reservations_rooms.reservation_id = $1",
			[id]
		);
		result.rows.forEach(({ room_id, num_of_adults, num_of_children, num_of_infants }) => {
			let item = { roomId: room_id, numOfAdults: num_of_adults, numOfChildren: num_of_children, numOfInfants: num_of_infants };
			reservation.rooms.push(item);
		});

		// Send reservation
		res.json(reservation);
	} catch (err) {
		sendGenericError(res);
	}
};

export const cancelReservation = async (req, res) => {
	// Destructure request object for data
	let { id, email } = req.query;

	// Send error if no reservation ID provided
	if (!id) return res.status(400).send("Error: No reservation ID provided.");

	// Validate and sanitise reservation ID
	id = trim(id);
	if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 7, max: 7 })) return res.status(400).send("Error: Invalid reservation ID provided.");

	// Do the following if user is logged in
	if (req.user) {
		// Validate and sanitise ID
		let userId = trim(req.user.id);
		if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

		// CANCEL RESERVATION
		try {
			// Get reservation
			let result = await pool.query("SELECT * FROM reservations WHERE id = $1 AND guest_id = $2", [id, userId]);

			// Send error if reservation does not exist
			if (result.rows.length === 0) return res.status(404).send("Error: This reservation does not exist.");

			// Send error if reservation check-in date is within 48 hours
			if (new Date(result.rows[0].checkin_date).getTime() / 1000 - new Date().getTime() / 1000 <= 172800)
				return res.status(403).send("Error: This reservation cannot be cancelled as check-in is within 48 hours.");

			// Cancel reservation if pending
			if (result.rows[0].status === "pending") {
				result = await pool.query("UPDATE reservations SET status = 'cancelled' WHERE id = $1 AND guest_id = $2 RETURNING id", [id, userId]);
				return res.status(200).send(`Reservation cancelled with ID: ${result.rows[0].id}`);
			}

			// Send error if reservation has been processed
			return res.status(403).send(`Error: This reservation is already ${result.rows[0].status}`);
		} catch (err) {
			sendGenericError(res);
		}
	}

	// Validate and sanitise email
	if (typeof email !== "string") return res.status(400).send("Error: Email must be a string.");
	email = sanitizeHtml(normalizeEmail(trim(escape(email)), { gmail_remove_dots: false }));
	if (!isEmail(email)) return res.status(400).send("Error: Invalid email provided.");

	try {
		// Get reservation
		let result = await pool.query("SELECT * FROM reservations WHERE id = $1 AND email = $2", [id, email]);

		// Send error if reservation does not exist
		if (result.rows.length === 0) return res.status(404).send("Error: This reservation does not exist.");

		// Send error if reservation check-in date is within 48 hours
		if (new Date(result.rows[0].checkin_date).getTime() / 1000 - new Date().getTime() / 1000 <= 172800)
			return res.status(403).send("Error: This reservation cannot be cancelled as check-in is within 48 hours.");

		// Cancel reservation if pending
		if (result.rows[0].status === "pending") {
			result = await pool.query("UPDATE reservations SET status = 'cancelled' WHERE id = $1 AND email = $2 RETURNING id", [id, email]);
			return res.status(200).send(`Reservation cancelled with ID: ${result.rows[0].id}`);
		}

		// Send error if reservation has been processed
		res.status(403).send(`Error: This reservation is already ${result.rows[0].status}`);
	} catch (err) {
		sendGenericError(res);
	}
};

export const beginCheckout = async (req, res, next) => {
	// Generate reservation ID
	const reservationId = idGen(7);

	// VALIDATION AND SANITISATION
	let { phone, checkInDate, checkOutDate, rooms } = req.body;

	// Phone number
	if (typeof phone !== "number" && typeof phone !== "string") return res.status(400).send("Error: Phone must be a number.");
	phone = sanitizeHtml(trim(typeof phone === "number" ? phone.toString() : phone));
	if (!isNumeric(phone, { no_symbols: true })) return res.status(400).send("Error: Phone must contain numbers only.");
	if (!isLength(phone, { min: 12, max: 12 })) return res.status(400).send("Error: Invalid phone number provided (must be 254XXXXXXXXX).");
	if (!checkPhone("safaricom", phone)) return res.status(400).send("Error: Phone must be a Safaricom number.");

	// Check-in date
	if (typeof checkInDate !== "string") return res.status(400).send("Error: Check-in date must be a string.");
	if (!isDate(checkInDate, { format: "YYYY-MM-DD", strictMode: true })) return res.status(400).send("Error: Invalid check-in date provided (must be YYYY-MM-DD).");
	if (new Date(checkInDate) < new Date()) return res.status(400).send("Error: Check-in date must be in the future.");

	// Check-out date
	if (typeof checkOutDate !== "string") return res.status(400).send("Error: Check-out date must be a string.");
	if (!isDate(checkOutDate, { format: "YYYY-MM-DD", strictMode: true })) return res.status(400).send("Error: Invalid check-out date provided (must be YYYY-MM-DD).");
	if (new Date(checkOutDate) <= new Date(checkInDate)) return res.status(400).send("Error: Check-out date must be after check-in date.");

	// Rooms
	if (!Array.isArray(rooms)) return res.status(400).send("Error: Rooms must be an array.");
	rooms.forEach((room) => {
		// VALIDATION AND SANITISATION
		let { roomTypeId, numOfAdults, numOfChildren, numOfInfants } = room;

		// Room type ID
		if (!isNumeric(roomTypeId, { no_symbols: true }) || !isLength(roomTypeId, { min: 1, max: 1 })) return res.status(400).send("Error: Invalid room type ID in rooms array.");

		// Number of adults, children and infants
		if (!isNumeric(numOfAdults, { no_symbols: true })) return res.status(400).send("Error: Number of adults must contain numbers only.");
		if (!isNumeric(numOfChildren, { no_symbols: true })) return res.status(400).send("Error: Number of children must contain numbers only.");
		if (!isNumeric(numOfInfants, { no_symbols: true })) return res.status(400).send("Error: Number of infants must contain numbers only.");
	});

	// Email
	let email = req.user.email || req.body.email;
	if (typeof email !== "string") return res.status(400).send("Error: Email must be a string.");
	email = sanitizeHtml(normalizeEmail(trim(escape(email)), { gmail_remove_dots: false }));
	if (!isEmail(email)) return res.status(400).send("Error: Invalid email provided.");

	// User ID
	let userId = req.user.id ? trim(req.user.id) : null;
	if (userId && (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 }))) return res.status(401).send("Error: Invalid user ID in session.");

	try {
		// Send data to next middleware
		req.reservationId = reservationId;

		req.phone = phone;
		req.checkInDate = checkInDate;
		req.checkOutDate = checkOutDate;
		req.rooms = rooms;

		req.email = email;
		req.userId = userId;
		next();
	} catch (err) {
		sendGenericError(res);
	}
};

export const getMpesaToken = async (req, res, next) => {
	// Daraja API access token endpoint
	const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

	// Generate Base64-encoded string with consumer key and consumer secret
	const auth = new Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");

	try {
		// Get access token
		let response = await axios.get(url, { headers: { Authorization: `Basic ${auth}` } });

		// Pass access token to next middleware function
		req.accessToken = response.data.access_token;
		next();
	} catch (err) {
		// Do the following if error generated by M-Pesa
		if (err.response) {
			// Destructure error response object
			let { status, data } = err.response;

			// Send error
			if (data.errorMessage) return res.status(status).send(`Error: ${data.errorMessage} (M-Pesa)`);
		}

		// Send generic error message
		sendGenericError(res);
	}
};

export const makeMpesaPayment = async (req, res, next) => {
	// Destructure request object for M-Pesa access token
	let { accessToken, phone } = req;

	// Daraja API M-Pesa Express endpoint
	const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

	// Define timestamp generator function
	const generateTimestamp = (time = Date.now()) => {
		// Create date object from current time
		let date = new Date(time);

		// Convert date to correct format for request
		const formatDate = (date) => date.toLocaleString("en-KE", { minimumIntegerDigits: 2, useGrouping: false });

		// Define separate timestamp elements
		let year = date.getFullYear();
		let month = formatDate(date.getMonth() + 1);
		let day = formatDate(date.getDate());
		let hours = formatDate(date.getHours());
		let minutes = formatDate(date.getMinutes());
		let seconds = formatDate(date.getSeconds());

		// Return timestamp
		return year + month + day + hours + minutes + seconds;
	};

	// Define sandbox business shortcode
	let shortcode = 174379;

	// Generate Base64-encoded password string with shortcode, M-Pesa passkey and timestamp
	let password = new Buffer.from(`${shortcode}${process.env.MPESA_PASSKEY}${generateTimestamp()}`).toString("base64");

	// Define request body and headers
	let body = JSON.stringify({
		BusinessShortCode: shortcode,
		Password: password,
		Timestamp: generateTimestamp(),
		TransactionType: "CustomerPayBillOnline",
		Amount: totalCost,
		PartyA: phone,
		PartyB: shortcode,
		PhoneNumber: phone,
		CallBackURL: "https://kitanda-guest-house-production.up.railway.app/api/payment/mpesa-callback",
		AccountReference: "Kitanda Guest House",
		TransactionDesc: "Booking payment",
	});
	let headers = { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` };

	try {
		// Make payment
		await axios.post(url, body, { headers });

		// Send data to next middleware
		next();
	} catch (err) {
		// Do the following if error generated by M-Pesa
		if (err.response) {
			// Destructure error response object
			let { status, data } = err.response;

			// Send error
			if (data.errorMessage) return res.status(status).send(`Error: ${data.errorMessage} (M-Pesa)`);
		}

		// Send generic error message
		sendGenericError(res);
	}
};

export const completeCheckout = async (req, res) => {
	// Destructure request object for checkout data
	let { reservationId, phone, checkInDate, checkOutDate, rooms, email, userId } = req;

	try {
		// Get total price of reservation
		// Create reservation room prices array
		let prices = [];

		// Add price of each room to array
		rooms.forEach(async ({ roomTypeId }) => {
			let result = await pool.query("SELECT price_per_night FROM room_types WHERE id = $1", [roomTypeId]);
			prices.push(result.rows[0].price_per_night);
		});

		// Get total cost of all rooms in reservation
		let totalPrice = prices.reduce((a, b) => a + b);

		// Create reservation
		let text = `INSERT INTO reservations (id, guest_id, phone, email, checkin_date, checkout_date, total_price, created_at) VALUES ($1, $2, $3, $4, to_timestamp($5, 'YYYY-MM-DD'), to_timestamp($6, 'YYYY-MM-DD'), $7, to_timestamp(${Date.now()} / 1000)) RETURNING id`;
		let values = [reservationId, userId, phone, email, checkInDate, checkOutDate, totalPrice];
		let result = await pool.query(text, values);

		// Confirm reservation
		res.status(201).send(`Reservation made with ID: ${result.rows[0].id}`);
	} catch (err) {
		sendGenericError(res);
	}
};
