/* IMPORTS */
import bcrypt from "bcrypt";
import passport from "passport";
import requestIp from "request-ip";

import pool from "../pool.js";
import idGen from "../../util/idGen.js";
import loginAttempt from "../../util/loginAttempt.js";


/* FUNCTIONS */
export const login = async(req, accessToken, refreshToken, profile, done) => {
    // Get request IP address
    const ip = requestIp.getClientIp(req);

    // Generate login attempt ID
    const attemptId = idGen(15);

    try { // Get third-party credentials
        let result = await pool.query("SELECT * FROM federated_credentials WHERE id = $1 AND provider = $2", [profile.id, profile.provider]);

        // Do the following if user is logged in
        if (req.user) {
            // Link user to third-party credentials if none found
            if (result.rows.length === 0) {
                // Add credentials to database as confirmed
                let text = "INSERT INTO federated_credentials (id, guest_id, provider, confirmed) VALUES ($1, $2, $3, $4)";
                let values = [profile.id, req.user.id, profile.provider, true];
                result = await pool.query(text, values);

                // Return user to session
                req.user.federatedCredentials.push({ id: profile.id, provider: profile.provider, confirmed: true });
                return done(null, req.user, "/account");
            }

            // Return user to session if third-party credentials are already linked
            return done(null, req.user, "/account");
        }

        // Create new account with third-party credentials if none found
        if (result.rows.length === 0) {
            // Check for existing account with third-party email
            result = await pool.query("SELECT email FROM guests WHERE email = $1", [profile.emails[0].value]);

            // Send error if email already exists in database
            if (result.rows.length > 0) return done({ status: 409, message: "Error: A user with the provided email already exists." });

            // Generate user ID
            const userId = idGen(10);

            // Generate password hash
            const salt = await bcrypt.genSalt(17);
            const passwordHash = await bcrypt.hash(process.env.GENERIC_PASSWORD, salt);

            // Add user to database
            let text = `INSERT INTO guests (id, first_name, last_name, phone, email, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, to_timestamp(${Date.now()} / 1000)) RETURNING id`;
            let values = [userId, profile.name.givenName, profile.name.familyName, "254700000000", profile.emails[0].value, passwordHash];
            result = await pool.query(text, values);

            // Add third-party credentials to database
            result = await pool.query("INSERT INTO federated)credentials (id, guest_id, provider) VALUES ($1, $2, $3)", [profile.id, userId, profile.provider]);

            // Add user details to be confirmed to session
            let federatedCredentials = [{ id: profile.id, provider: profile.provider, confirmed: false }];
            return done(null, { id: userId, email: profile.emails[0].value, federatedCredentials });
        }

        // Get user details
        let text = "SELECT guests.id AS id, guests.email AS email FROM guests JOIN federated_credentials ON federated_credentials.guest_id = guests.id WHERE federated_credentials.id = $1 AND federated_credentials.provider = $2";
        let values = [profile.id, profile.provider];
        result = await pool.query(text, values);

        // Create user object and third-party credentials array
        let data = { id: result.rows[0].id, email: result.rows[0].email };
        let federatedCredentials = [];

        // Get all third-party credentials
        result = await pool.query("SELECT id, provider, confirmed FROM federated_credentials WHERE guest_id = $1", [data.id]);

        // Add each credential to array
        result.rows.forEach(({ id, provider, confirmed }) => federatedCredentials.push({ id, provider, confirmed }));

        // Log login attempt
        await loginAttempt(attemptId, ip, profile.emails[0].value, profile.provider, true);

        // Add user to session
        return done(null, {...data, federatedCredentials });
    } catch (err) {
        return done({ status: 500, message: "An unknown error occurred. Kindly try again." });
    }
}

export const callback = strategy => {
    // Return authentication middleware function
    return (req, res) => {
        passport.authenticate(strategy, async(err, user, redirect) => {
            // Send error if present
            if (err) return res.status(err.status).send(err.message);

            // Authenticate user
            req.login(user, (err) => {
                // Send error if present
                if (err) return res.status(500).send("An unknown error occurred. Kindly try again.");

                // Return user object if local login
                if (strategy === "local") return res.json(user);

                // Redirect new user to confirm account details after linking third-party account
                if (!user.federatedCredentials[0].confirmed) return res.redirect("/register");

                // Redirect user to redirect path if provided
                if (typeof redirect === "string") return res.redirect(redirect);

                // Redirect user to account
                res.redirect("/account");
            });
        })(req, res);
    }
}