/* IMPORTS */
import express from "express";
import passport from "passport";
import { callback } from "../../db/auth/third.js";

/* IMPLEMENTATION */
const loginRouter = express.Router();

// Local
loginRouter.post("/", callback("local"));
loginRouter.all("/", (req, res) => res.send("Kindly log in with your account details"));

// Google
loginRouter.get("/google", passport.authenticate("google"));
loginRouter.get("/google/callback", callback("google"));

// Facebook
loginRouter.get("/facebook", passport.authenticate("facebook"));
loginRouter.get("/facebook/callback", callback("facebook"));

/* EXPORT */
export default loginRouter;
