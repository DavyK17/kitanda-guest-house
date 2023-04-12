/* IMPORTS */
import express from "express";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "../../db/addresses.js";

/* IMPLEMENTATION */
const addressesRouter = express.Router();

addressesRouter.get("/", getAddresses);
addressesRouter.post("/", createAddress);
addressesRouter.put("/", updateAddress);
addressesRouter.delete("/", deleteAddress);

/* EXPORT */
export default addressesRouter;
