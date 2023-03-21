/* IMPORTS */
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool.js";

import passport from "passport";


/* CONFIGURATION */
// General
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App
const app = express();
app.use(express.static(join(__dirname, "..", "build")));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
if (app.get("env") === "development") app.use(cors({ origin: "http://localhost:3000" }));

// Helment
app.use(helmet());

// Session
const pgSession = connectPgSimple(session);
const sessionConfig = {
    store: new pgSession({ pool, tableName: "user_sessions", createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET,
    name: "kitanda_sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "lax", // necessary to enable access to req.user during Passport authentication for linking third-party accounts
        secure: app.get("env") === "production",
    }
}

if (app.get("env") === "production") app.set("trust proxy", 1);
app.use(session(sessionConfig));

// Passport
app.use(passport.initialize());
app.use(passport.session());


/* ROUTING */
// Client
app.get("/*", (req, res) => {
    res.send("Welcome to Kitanda Guest House!");
});


/* EXPORT */
export default app;