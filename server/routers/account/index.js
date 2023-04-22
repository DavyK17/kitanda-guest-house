/* IMPORTS */
import express from "express";
import { getUser, updateUser, deleteUser, unlinkThirdParty } from "../../db/account.js";
import { loggedIn } from "../../middleware/authenticated.js";
import addressesRouter from "./addresses.js";

/* IMPLEMENTATION */
const accountRouter = express.Router();

accountRouter.get("/", loggedIn, getUser);
accountRouter.put("/", loggedIn, updateUser);
accountRouter.delete("/", loggedIn, deleteUser);

accountRouter.delete("/third", loggedIn, unlinkThirdParty);
accountRouter.use("/addresses", addressesRouter);

/* EXPORT */
export default accountRouter;
