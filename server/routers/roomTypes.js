/* IMPORTS */
import express from "express";
import { getRoomTypes } from "../db/roomTypes.js";

/* IMPLEMENTATION */
const roomTypesRouter = express.Router();
roomTypesRouter.get("/", getRoomTypes);

/* EXPORT */
export default roomTypesRouter;
