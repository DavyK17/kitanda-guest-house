/* IMPORTS */
import express from "express";
import { loggedIn } from "../middleware/authenticated.js";

// Routers
import authRouter from "./auth/index.js";
import accountRouter from "./account.js";
import roomTypesRouter from "./roomTypes.js";


/* CONFIGURATION */
const apiRouter = express.Router();

// Routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/account", loggedIn, accountRouter);
apiRouter.use("/room-types", roomTypesRouter);


/* EXPORT */
export default apiRouter;