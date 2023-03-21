/* IMPORTS */
import dotenv from "dotenv";
import express from "express";
import pool from "../../db/pool.js";
import { loggedIn } from "../../middleware/authenticated.js";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as FacebookStrategy } from "passport-facebook";

import { login as localLogin, logout } from "../../db/auth/local.js";
import { login as thirdLogin } from "../../db/auth/third.js";

import loginRouter from "./login.js";
import registerRouter from "./register.js";


/* CONFIGURATION */
dotenv.config();
const authRouter = express.Router();

/* PASSPORT.JS */
// Strategies
passport.use(new LocalStrategy({ usernameField: "email", passReqToCallback: true }, localLogin));
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_ENV === "production" ? "https://kitandaguesthouse.up.railway.app" : "http://localhost:8000"}/api/auth/login/google/callback`,
    passReqToCallback: true,
    scope: ["email", "profile"]
}, thirdLogin));
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.NODE_ENV === "production" ? "https://kitandaguesthouse.up.railway.app" : "http://localhost:8000"}/api/auth/login/facebook/callback`,
    passReqToCallback: true,
    scope: ["email"],
    profileFields: ["id", "email", "first_name", "last_name"]
}, thirdLogin));

// Serialise and deserialise
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async(id, done) => {
    try {
        // Get user details
        let result = await pool.query("SELECT id, email FROM guests WHERE id = $1", [id]);

        // Return false if details not found
        if (result.rows.length === 0) return done(null, false);

        // Create user object and third-party credentials array
        let data = { id: result.rows[0].id, email: result.rows[0].email };
        let federatedCredentials = [];

        // Get all third-party credentials
        result = await pool.query("SELECT id, provider, confirmed FROM federated_credentials WHERE guest_id = $1", [id]);

        // Add each credential to array if present
        if (result.rows.length > 0) result.rows.forEach(({ id, provider, confirmed }) => federatedCredentials.push({ id, provider, confirmed }));

        // Return user object
        return done(null, {...data, federatedCredentials });
    } catch (err) {
        return done(err);
    }
});


/* IMPLEMENTATION */
authRouter.get("/logout", logout);
authRouter.all("/user", loggedIn, (req, res) => res.json(req.user));

authRouter.use("/login", loginRouter);
authRouter.use("/register", registerRouter);


/* EXPORT */
export default authRouter;