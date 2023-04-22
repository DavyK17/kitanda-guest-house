/* IMPORTS */
import express from "express";

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

/* EXPORT */
export default apiRouter;
