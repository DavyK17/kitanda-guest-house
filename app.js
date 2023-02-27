/* CONFIGURATION */

// General
require("dotenv").config();
const express = require("express");

// App
const app = express();


/* ROUTING */
// Client
app.get("/*", (req, res) => {
    res.send("Welcome to the Kenyan Comedy Directory!");
});


/* EXPORT */
module.exports = app;