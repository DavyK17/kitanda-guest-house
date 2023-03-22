/* IMPORTS */
import express from "express";
import { getReservations, cancelReservation, beginCheckout, getMpesaToken, makeMpesaPayment, completeCheckout } from "../db/reservations.js";


/* IMPLEMENTATION */
const reservationsRouter = express.Router();

// Routers
reservationsRouter.get("/cancel", cancelReservation);

reservationsRouter.get("/", getReservations);
reservationsRouter.post("/", beginCheckout, getMpesaToken, makeMpesaPayment, completeCheckout);


/* EXPORT */
export default reservationsRouter;