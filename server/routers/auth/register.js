/* IMPORTS */
import express from "express";
import { register, confirmThirdPartyRegistration } from "../../db/auth/local.js";
import { loggedIn, loggedOut } from "../../middleware/authenticated.js";

/* IMPLEMENTATION */
const registerRouter = express.Router();

registerRouter.get("/", loggedOut, (req, res) => res.send("Create a new account"));
registerRouter.post("/", loggedOut, register);

registerRouter.get("/ctpr", loggedIn, (req, res) => res.redirect("/api/auth/register"));
registerRouter.put("/ctpr", loggedIn, confirmThirdPartyRegistration);

/* EXPORT */
export default registerRouter;
