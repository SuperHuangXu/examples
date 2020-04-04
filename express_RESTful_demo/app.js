"use strict";
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");

mongoose.Promise = global.Promise;

const uri = "mongodb://localhost:27017/apiproject";
mongoose.connect(uri, {
   useMongoClient: true,
   /* other options */
});

const app = express();
// Helmet是一系列帮助增强Node.JS之Express/Connect等Javascript Web应用安全的中间件。
app.use(helmet());

// Router
const cars = require("./routes/cars");
const users = require("./routes/users");

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use("/cars", cars);
app.use("/users", users);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
   const err = new Error("Not Found!!!");
   err.status = 404;
   next(err);
});

// Error handler function
app.use((err, req, res, next) => {
   const error = app.get("dev") === "development" ? err : {};
   const status = err.status | 500;
   // respond to client
   res.status(status).json({
      message: error.message
   });
});

// Start the server
const port = app.get("port") || 3000;

app.listen(port, () => {
   console.log(`server is listening on port ${port}`);
});
