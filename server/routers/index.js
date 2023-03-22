/* IMPORTS */
import express from "express";
import { loggedIn } from "../middleware/authenticated.js";

// Routers
import authRouter from "./auth/index.js";
import accountRouter from "./account.js";


/* CONFIGURATION */
const apiRouter = express.Router();

// Routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/account", loggedIn, accountRouter);


/* EXPORT */
export default apiRouter;