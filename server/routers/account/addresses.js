/* IMPORTS */
import express from "express";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "../../db/addresses.js";


/* IMPLEMENTATION */
const addressesRouter = express.Router();

addressesRouter.get("/:id", getAddresses);
addressesRouter.put("/:id", updateAddress);
addressesRouter.delete("/:id", deleteAddress);

addressesRouter.get("/", getAddresses);
addressesRouter.post("/", createAddress)


/* EXPORT */
export default addressesRouter;