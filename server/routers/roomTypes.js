/* IMPORTS */
import express from "express";
import { getRoomTypes, getAvailableRoomTypes } from "../db/roomTypes.js";

/* IMPLEMENTATION */
const roomTypesRouter = express.Router();
roomTypesRouter.get("/", getRoomTypes);
roomTypesRouter.get("/available", getAvailableRoomTypes);

/* EXPORT */
export default roomTypesRouter;
