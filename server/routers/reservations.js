/* IMPORTS */
import express from "express";
import { getReservations, cancelReservation, makeReservation, linkAddressToReservation, beginMpesaPayment, getMpesaToken, completeMpesaPayment } from "../db/reservations.js";

/* IMPLEMENTATION */
const reservationsRouter = express.Router();

// Routers
reservationsRouter.get("/cancel", cancelReservation);
reservationsRouter.post("/link-address", linkAddressToReservation);
reservationsRouter.post("/confirm", beginMpesaPayment, getMpesaToken, completeMpesaPayment);

reservationsRouter.get("/", getReservations);
reservationsRouter.post("/", makeReservation);

/* EXPORT */
export default reservationsRouter;
