/* CONFIGURATION */

// General
require("dotenv").config();
const express = require("express");

// App
const app = express();


/* ROUTING */
// Client
app.get("/*", (req, res) => {
    res.send("Welcome to Kitanda Guest House!");
});


/* EXPORT */
module.exports = app;