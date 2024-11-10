// require("dotenv").config();
// const createError = require("http-errors");
// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const { v4: uuidv4 } = require("uuid");
// const nocache = require("nocache");
// const methodOverride = require("method-override");

// // Route files import
// const authRouter = require("./src/routes/authRoute");

// // Express App
// const app = express();

// // Connect Database
// const { connectDB } = require("./src/config/db");
// connectDB();

// // Middleware setup
// app.use(logger("dev"));
// app.use(methodOverride("_method"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // nocache for disabling browser caching
// app.use(nocache());

// // Routes
// app.use("/api/users", authRouter);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use((err, req, res, next) => {
//   if (res.headersSent) {
//     // If headers are already sent, delegate to default Express error handler
//     return next(err);
//   }

//   // Set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // Render or respond with error status
//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: req.app.get("env") === "development" ? err : {}
//   });
// });

// module.exports = app;


require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
const nocache = require("nocache");
const methodOverride = require("method-override");

// Route files import
const authRouter = require("./src/routes/authRoute");

// Express App
const app = express();

// Connect Database
const { connectDB } = require("./src/config/db");
connectDB();

// Middleware setup
app.use(logger("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// nocache for disabling browser caching
app.use(nocache());

// Routes
app.use("/api/users", authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});

// Export the Express app for Vercel to use as a serverless function
module.exports = app;
