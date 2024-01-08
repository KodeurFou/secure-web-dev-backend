console.log("ça marche !");  

require("dotenv").config();
const express = require("express");
const locationsController = require("./src/locations/locations.controller");
const usersController = require("./src/users/users.controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./src/authentication/local.strategy");
require("./src/authentication/jwt.strategy");
const passport = require("passport");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors("*"));

// Protect all /locations route with JWT Authentication
app.use(
  "/locations",
  passport.authenticate("jwt", { session: false }),
  locationsController
);
app.use("/users", (req, res, next) => {
  console.log(`Received a ${req.method} request on ${req.originalUrl}`);
  next();
}, usersController);

app.get("/", (req, res) => res.status(200).json({ message: "Hello World !" }));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URI);
//   console.log("Connected to Mongo Database");
//   app.listen(port, () => {
//     console.log(
//       `API listening on port ${port}, visit http://localhost:${port}/`
//     );
//   });
// }

// main();

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log("Connected")
  console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

// Export the Express API
module.exports = app;
