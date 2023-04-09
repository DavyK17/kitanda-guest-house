/* IMPORTS */
import bcrypt from "bcrypt";
import pool from "../pool.js";
import requestIp from "request-ip";

import checkPhone from "../../util/checkPhone.js";
import { checkPassword } from "../../util/passwordCheck.js";
import idGen from "../../util/idGen.js";
import loginAttempt from "../../util/loginAttempt.js";
import sanitizeHtml from "../../util/sanitizeHtml.js";
import sendGenericError from "../../util/sendGenericError.js";

import pkg from "validator";
const { isEmail, isNumeric, isLength, trim, escape, normalizeEmail } = pkg;


/* FUNCTIONS */
export const register = async(req, res) => {
    // Generate user ID
    const userId = idGen(10);

    // VALIDATION AND SANITISATION
    let { firstName, lastName, companyName, phone, email, password, confirmPassword } = req.body;

    // First name
    if (typeof firstName !== "string") return res.status(400).send("Error: First name must be a string.");
    firstName = sanitizeHtml(trim(escape(firstName)));

    // Last name
    if (typeof lastName !== "string") return res.status(400).send("Error: Last name must be a string.");
    lastName = sanitizeHtml(trim(escape(lastName)));

    // Company name
    if (typeof companyName !== "string") return res.status(400).send("Error: Company name must be a string.");
    companyName = sanitizeHtml(trim(escape(companyName)));

    // Phone number
    if (typeof phone !== "number" && typeof phone !== "string") return res.status(400).send(`Error: Phone number must be a number.`);
    phone = sanitizeHtml(trim(typeof phone === "number" ? phone.toString() : phone));
    if (!isNumeric(phone, { no_symbols: true })) return res.status(400).send("Error: Phone must contain numbers only.");
    if (!isLength(phone, { min: 12, max: 12 })) return res.status(400).send("Error: Invalid phone number provided (must be 254XXXXXXXXX).");
    if (!checkPhone("general", phone)) return res.status(400).send("Error: Phone must be Kenyan (starts with \"254\").");

    // Email
    if (typeof email !== "string") return res.status(400).send("Error: Email must be a string.");
    email = sanitizeHtml(normalizeEmail(trim(escape(email)), { gmail_remove_dots: false }));
    if (!isEmail(email)) return res.status(400).send("Error: Invalid email provided.");

    // Password
    if (!checkPassword(password)) return res.status(400).send("Error: Password must be 8 to 15 characters long and contain at least one uppercase letter, lowercase letter, numeric digit and special character.");
    if (password !== confirmPassword) return res.status(400).send("Error: Passwords do not match.");

    const salt = await bcrypt.genSalt(17);
    const passwordHash = await bcrypt.hash(trim(password), salt);

    try {
        // Send error if email already exists in database
        let result = await pool.query("SELECT email FROM guests WHERE email = $1", [email]);
        if (result.rows.length > 0) return res.status(409).send("Error: A user with the provided email already exists.");

        // Add user to database
        let text = `INSERT INTO guests (id, first_name, last_name, company_name, phone, email, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, to_timestamp(${Date.now()} / 1000)) RETURNING id`;
        let values = [userId, firstName, lastName, companyName, phone, email, passwordHash];
        result = await pool.query(text, values);
        res.status(201).send(`User created with ID: ${result.rows[0].id}`);
    } catch (err) {
        sendGenericError(res);
    }
}

export const confirmThirdPartyRegistration = async(req, res) => {
    // Send error if user is not authorised
    if (!req.user.federatedCredentials[0]) return res.status(401).send("Error: You are not authorised to perform this operation.");

    // VALIDATION AND SANITISATION
    let { phone, password, confirmPassword } = req.body;

    // Phone number
    if (typeof phone !== "number" && typeof phone !== "string") return res.status(400).send(`Error: Phone number must be a number.`);
    phone = sanitizeHtml(trim(typeof phone === "number" ? phone.toString() : phone));
    if (!isNumeric(phone, { no_symbols: true })) return res.status(400).send("Error: Phone must contain numbers only.");
    if (!isLength(phone, { min: 12, max: 12 })) return res.status(400).send("Error: Invalid phone number provided (must be 254XXXXXXXXX).");
    if (!checkPhone("general", phone)) return res.status(400).send("Error: Phone must be Kenyan (starts with \"254\").");

    // Password
    if (!checkPassword(password)) return res.status(400).send("Error: Password must be 8 to 15 characters long and contain at least one uppercase letter, lowercase letter, numeric digit and special character.");
    if (password !== confirmPassword) return res.status(400).send("Error: Passwords do not match.");

    const salt = await bcrypt.genSalt(17);
    const passwordHash = await bcrypt.hash(trim(password), salt);

    // User ID
    let userId = trim(req.user.id);
    if (!isNumeric(userId, { no_symbols: true }) || !isLength(userId, { min: 10, max: 10 })) return res.status(401).send("Error: Invalid user ID in session.");

    try { // Update user details
        let result = await pool.query("UPDATE guests SET phone = $1, password = $2 WHERE id = $3 RETURNING id", [phone, passwordHash, userId]);

        // Confirm update
        if (result.rows[0].id === userId) {
            // Update third-party details confirmation status
            let text = "UPDATE federated_credentials SET confirmed = $1 WHERE provider = $2 AND user_id = $3";
            let values = [true, req.user.federatedCredentials[0].provider, userId];
            result = await pool.query(text, values);

            // Get updated user details
            result = await pool.query("SELECT id, email FROM guests WHERE email = $1", [req.user.email]);

            // Create user object and third-party credentials array
            let data = { id: result.rows[0].id, email: result.rows[0].email };
            let federatedCredentials = [];

            // Get third-party credentials
            result = await pool.query("SELECT id, provider, confirmed FROM federated_credentials WHERE guest_id = $1", [userId]);

            // Add each credential to array
            if (result.rows.length > 0) result.rows.forEach(({ id, provider, confirmed }) => federatedCredentials.push({ id, provider, confirmed }));

            // Update and return user object in session
            req.user = { ...data, federatedCredentials };
            res.json(req.user);
        }

    } catch (err) {
        sendGenericError(res);
    }
}

export const logout = (req, res) => {
    // Send error if already logged out
    if (!req.user) return res.status(403).send("Error: You are already logged out.");

    // Log out
    req.logout(err => {
        if (err) return sendGenericError(res);
        res.send("Logout successful");
    });
}

export const login = async(req, email, password, done) => {
    // Send error if already logged in
    if (req.user) return done({ status: 403, message: "Error: You are already logged in." });

    // Get request IP address
    const ip = requestIp.getClientIp(req);

    // Generate login attempt ID
    const attemptId = idGen(15);

    // Validate and sanitise email
    if (!email) return done({ status: 400, message: "Error: No email provided." });
    if (typeof email !== "string") return done({ status: 400, message: "Error: Email must be a string." });
    email = sanitizeHtml(normalizeEmail(trim(escape(email)), { gmail_remove_dots: false }));
    if (!isEmail(email)) return done({ status: 400, message: "Error: Invalid email provided." });

    // Validate password
    if (!password) return done({ status: 400, message: "Error: No password provided." });

    try { // Get user details
        let result = await pool.query("SELECT id, email, password FROM guests WHERE email = $1", [email]);

        // Send error if user does not exist
        if (result.rows.length === 0) {
            await loginAttempt(attemptId, ip, email, "local", false);
            return done({ status: 401, message: "Error: Incorrect email or password provided." });
        }

        // Send error if password hashes do not match
        const passwordMatch = await bcrypt.compare(password, result.rows[0].password);
        if (!passwordMatch) {
            await loginAttempt(attemptId, ip, email, "local", false);
            return done({ status: 401, message: "Error: Incorrect email or password provided." });
        }

        // Create user object and third-party credentials array
        let data = { id: result.rows[0].id, email: result.rows[0].email };
        let federatedCredentials = [];

        // Get third-party credentials
        result = await pool.query("SELECT id, provider, confirmed FROM federated_credentials WHERE guest_id = $1", [data.id]);

        // Add each credential to array
        if (result.rows.length > 0) result.rows.forEach(({ id, provider, confirmed }) => federatedCredentials.push({ id, provider, confirmed }));

        // Add user to session
        await loginAttempt(attemptId, ip, email, "local", true);
        return done(null, {...data, federatedCredentials });
    } catch (err) {
        return done({ status: 500, message: "An unknown error occurred. Kindly try again." });
    }
}