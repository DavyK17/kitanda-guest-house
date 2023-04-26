/* IMPORTS */
import bcrypt from "bcrypt";
import pool from "./pool.js";

import checkPhone from "../util/checkPhone.js";
import { checkPassword } from "../util/passwordCheck.js";
import pkg from "validator";
import sanitizeHtml from "../util/sanitizeHtml.js";
import sendGenericError from "../util/sendGenericError.js";

const { isEmail, isNumeric, isLength, trim, escape, normalizeEmail } = pkg;

/* FUNCTIONS */
export const getUser = async (req, res) => {
	try {
		// Validate and sanitise user ID
		let id = trim(req.user.id);
		if (!isNumeric(id, { no_symbols: true }) || !isLength(id, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

		// Get user
		let result = await pool.query("SELECT id, title, first_name, last_name, company_name, phone, email FROM guests WHERE id = $1", [id]);
		let user = {
			id: result.rows[0].id,
			title: result.rows[0].title,
			firstName: result.rows[0].first_name,
			lastName: result.rows[0].last_name,
			companyName: result.rows[0].company_name,
			phone: parseInt(result.rows[0].phone),
			email: result.rows[0].email,
		};

		// Get third-party credentials and create federated credentials array
		result = await pool.query("SELECT id, provider, confirmed FROM federated_credentials WHERE guest_id = $1", [id]);
		let federatedCredentials = [];

		// Add each credential to array
		if (result.rows.length > 0) result.rows.forEach(({ id, provider, confirmed }) => federatedCredentials.push({ id, provider, confirmed }));

		// Send user
		res.json({ ...user, federatedCredentials });
	} catch (err) {
		sendGenericError(res);
	}
};

export const updateUser = async (req, res) => {
	// Validate and sanitise user ID
	let userId = trim(req.user.id);
	if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

	try {
		// Retrieve existing details from database if not provided in body
		let result = await pool.query("SELECT title, first_name, last_name, company_name, phone, email, password FROM guests WHERE id = $1", [userId]);

		// Create existing details object
		let old = {
			title: result.rows[0].title,
			firstName: result.rows[0].first_name,
			lastName: result.rows[0].last_name,
			companyName: result.rows[0].company_name,
			phone: result.rows[0].phone,
			email: result.rows[0].email,
			password: result.rows[0].password,
		};

		// VALIDATION AND SANITISATION
		let { title, firstName, lastName, companyName, phone, email, currentPassword, newPassword, confirmNewPassword } = req.body;

		// Send error if no details are provided
		if (!title && !firstName && !lastName && !phone && !email && !currentPassword && !newPassword) return res.status(400).send("Error: No updates provided.");

		// Title
		title = title || old.title;
		if (typeof title !== "string") return res.status(400).send("Error: Title must be a string.");
		title = sanitizeHtml(trim(escape(title)));

		// First name
		firstName = firstName || old.firstName;
		if (typeof firstName !== "string") return res.status(400).send("Error: First name must be a string.");
		firstName = sanitizeHtml(trim(escape(firstName)));

		// Last name
		lastName = lastName || old.lastName;
		if (typeof lastName !== "string") return res.status(400).send("Error: Last name must be a string.");
		lastName = sanitizeHtml(trim(escape(lastName)));

		// Last name
		companyName = companyName || old.companyName;
		if (typeof companyName !== "string") return res.status(400).send("Error: Company name must be a string.");
		companyName = sanitizeHtml(trim(escape(companyName)));

		// Phone number
		phone = phone || old.phone;
		if (typeof phone !== "number" && typeof phone !== "string") return res.status(400).send("Error: Phone must be a number.");
		phone = sanitizeHtml(trim(typeof phone === "number" ? phone.toString() : phone));
		if (!isNumeric(phone, { no_symbols: true })) return res.status(400).send("Error: Phone must contain numbers only.");
		if (!isLength(phone, { min: 12, max: 12 })) return res.status(400).send("Error: Invalid phone number provided (must be 254XXXXXXXXX).");
		if (!checkPhone("general", phone)) return res.status(400).send('Error: Phone must be Kenyan (starts with "254").');

		// Email
		email = email || old.email;
		if (typeof email !== "string") return res.status(400).send("Error: Email must be a string.");
		email = sanitizeHtml(normalizeEmail(trim(escape(email)), { gmail_remove_dots: false }));
		if (!isEmail(email)) return res.status(400).send("Error: Invalid email provided.");

		// Do the following if current password provided
		if (currentPassword) {
			// Send error if new password not provided
			if (!newPassword) return res.status(400).send("Error: No new password provided.");

			// Do the following if new password provided
			if (newPassword) {
				// Send error if current password is incorrect
				const currentPasswordMatch = await bcrypt.compare(trim(currentPassword), old.password);
				if (!currentPasswordMatch) return res.status(401).send("Error: Incorrect password provided.");

				// Send error if new password does not meet criteria
				if (!checkPassword(newPassword))
					return res
						.status(400)
						.send("Error: New password must be 8 to 15 characters long and contain at least one uppercase letter, lowercase letter, numeric digit and special character.");

				// Send error if new passwords don't match
				if (newPassword !== confirmNewPassword) return res.status(400).send("Error: New passwords do not match.");

				// Send error if no updates made
				const newPasswordMatch = await bcrypt.compare(newPassword, old.password);
				if (old.firstName === firstName && old.lastName === lastName && old.phone === phone && old.email === email && newPasswordMatch)
					return res.status(400).send("Error: No updates provided.");
			}
		}

		// Hash new password if present
		const salt = await bcrypt.genSalt(17);
		const passwordHash = newPassword ? await bcrypt.hash(trim(newPassword), salt) : old.password;

		// UPDATE USER DETAILS
		let text = "UPDATE guests SET title = $1, first_name = $2, last_name = $3, company_name = $4, phone = $5, email = $6, password = $7 WHERE id = $8 RETURNING id";
		let values = [title, firstName, lastName, companyName, phone, email, passwordHash, userId];
		result = await pool.query(text, values);

		// Confirm update
		if (result.rows[0].id === userId) {
			req.user.email = email;
			res.status(200).send("Account updated successfully");
		}
	} catch (err) {
		sendGenericError(res);
	}
};

export const deleteUser = async (req, res) => {
	// VALIDATION AND SANITISATION
	// User ID
	let userId = trim(req.user.id);
	if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

	try {
		// DELETE USER
		// Create reservations array
		let reservations = [];

		// Add each reservation by user to reservations array
		let result = await pool.query("SELECT id FROM reservations WHERE guest_id = $1", [userId]);
		result.rows.forEach((row) => reservations.push(row.id));

		// Delete each reservation in reservations array
		reservations.forEach(async (id) => {
			result = await pool.query("DELETE FROM reservations_rooms WHERE reservation_id = $1", [id]);
			result = await pool.query("DELETE FROM reservations WHERE id = $1", [id]);
		});

		// Create addresses array
		let addresses = [];

		// Add each address linked to user to addresses array
		let text = "SELECT id FROM addresses WHERE guest_id = $1";
		result = await pool.query(text, [userId]);
		result.rows.forEach((row) => addresses.push(row.id));

		// Delete each address in addresses array
		addresses.forEach(async (id) => (result = await pool.query("DELETE FROM addresses WHERE id = $1", [id])));

		// Delete third-party credentials
		result = await pool.query("DELETE FROM federated_credentials WHERE guest_id = $1", [userId]);

		// Delete user and log out
		result = await pool.query("DELETE FROM guests WHERE id = $1 RETURNING id", [userId]);
		if (result.rows[0].id === userId)
			req.logout((err) => {
				if (err) return res.status(500).send("An error occurred during logout. Kindly try again.");
				res.status(204).send("Account deleted successfully");
			});
	} catch (err) {
		sendGenericError(res);
	}
};

export const unlinkThirdParty = async (req, res) => {
	// VALIDATION AND SANITISATION
	// Third-party provider
	let provider = sanitizeHtml(trim(escape(req.query.provider))).toLowerCase();

	// User ID
	let userId = trim(req.user.id);
	if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

	try {
		// Get third-party credentials from given provider
		let result = await pool.query("SELECT * FROM federated_credentials WHERE guest_id = $1 AND provider = $2", [userId, provider]);

		// Send error if credentials do not exist
		if (result.rows.length === 0) return res.status(404).send("Error: No credentials found for the given provider.");

		// Delete third-party credentials from given provider
		result = await pool.query("DELETE FROM federated_credentials WHERE guest_id = $1 AND provider = $2", [userId, provider]);
		res.status(204).send(`${provider.charAt(0).toUpperCase() + provider.slice(1)} credentials unlinked successfully.`);
	} catch (err) {
		sendGenericError(res);
	}
};
