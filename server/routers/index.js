/* IMPORTS */
import express from "express";
import { loggedIn } from "../middleware/authenticated.js";

// Routers
import authRouter from "./auth/index.js";


/* CONFIGURATION */
const apiRouter = express.Router();

// Routers
apiRouter.use("/auth", authRouter);


/* EXPORT */
export default apiRouter;