/* IMPORTS */
import express from "express";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "../../db/addresses.js";
import { loggedIn } from "../../middleware/authenticated.js";

/* IMPLEMENTATION */
const addressesRouter = express.Router();

addressesRouter.get("/", loggedIn, getAddresses);
addressesRouter.post("/", createAddress);
addressesRouter.put("/", loggedIn, updateAddress);
addressesRouter.delete("/", loggedIn, deleteAddress);

/* EXPORT */
export default addressesRouter;
