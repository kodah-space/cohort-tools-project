const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const cors = require("cors");
require("dotenv").config();
require("./db");

const { isAuthenticated } = require("./middleware/jwt.middleware");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// ...

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv

// ℹ️ Connects to the database

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

// ADD CORS MIDDLEWARE INSIDE module.exports TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(
  cors({
    origin: ["http://localhost:5173"], // <== URL of our future React app
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const cohortRouter = require("./routes/cohort.routes"); // <== IMPORT
app.use("/api", isAuthenticated, cohortRouter); // <== ADD

const authRouter = require("./routes/auth.routes"); //  <== IMPORT
app.use("/auth", authRouter);

const studendRouter = require("./routes/student.routes");
app.use("/api", studentRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
module.exports = app;
