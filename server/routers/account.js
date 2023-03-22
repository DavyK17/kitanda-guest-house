/* IMPORTS */
import express from "express";
import { getUser, updateUser, deleteUser, unlinkThirdParty } from "../db/account.js";


/* IMPLEMENTATION */
const accountRouter = express.Router();

accountRouter.get("/", getUser);
accountRouter.put("/", updateUser);
accountRouter.delete("/", deleteUser);

accountRouter.delete("/third", unlinkThirdParty);


/* EXPORT */
export default accountRouter;