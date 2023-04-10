/* IMPORTS */
import express from "express";
import { getUser, updateUser, deleteUser, unlinkThirdParty } from "../../db/account.js";
import addressesRouter from "./addresses.js";

/* IMPLEMENTATION */
const accountRouter = express.Router();

accountRouter.get("/", getUser);
accountRouter.put("/", updateUser);
accountRouter.delete("/", deleteUser);

accountRouter.delete("/third", unlinkThirdParty);
accountRouter.use("/addresses", addressesRouter);

/* EXPORT */
export default accountRouter;
