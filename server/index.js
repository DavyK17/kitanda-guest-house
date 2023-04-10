/* IMPORTS */
import dotenv from "dotenv";
import app from "./app.js";

/* CONFIGURATION */
dotenv.config();
const port = process.env.PORT || 8000;

/* LISTENER */
app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
