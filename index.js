const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

const app = express();

process.on("uncaughtException", (ex) => {
  console.log("UNCAUGHT EXCEPTION");
  winston.errot(ex.message, ex);
});
process.on("unhandledRejection", (ex) => {
  console.log("UNHANDLED REJECTION");
  winston.errot(ex.message, ex);
});

winston.add(
  new winston.transports.File({
    filename: "logfile.log",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  })
);

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
