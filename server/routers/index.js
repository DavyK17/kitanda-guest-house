/* IMPORTS */
import express from "express";
import { seedDatabase } from "../db/seed/seed.js";

// Routers
import authRouter from "./auth/index.js";
import accountRouter from "./account/index.js";
import reservationsRouter from "./reservations.js";
import roomTypesRouter from "./roomTypes.js";

/* CONFIGURATION */
const apiRouter = express.Router();

// Routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/account", accountRouter);
apiRouter.use("/reservations", reservationsRouter);
apiRouter.use("/room-types", roomTypesRouter);

// Database seeding
apiRouter.post("/db/seed", seedDatabase);
apiRouter.all("/db/seed", (req, res) => res.status(400).send("Error: Invalid HTTP request method provided."));

/* EXPORT */
export default apiRouter;
