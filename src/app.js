const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const limiter = require("./middleware/rateLimiter");

const app = express();

app.use(
  // "*",
  cors({ credentials: true, origin: "http://localhost:3000" })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// rate limiter
// app.use(limiter);

app.use("/api", require("./routes"));
app.get("/", (req, res) => {
  return res.send({ status: "ok", message: "App running ..." });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(require("./middleware").errorHandling);

module.exports = app;
