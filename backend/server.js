// Author: Tobiloba Samuel
// Date: 10 Jan 2023
// Title of program/source code: Restful API for a Blog Service with NodeJS Express, MongoDB and Mongoose
// Type: source code
// Web address or publisher: https://tobisamcodes.hashnode.dev/restful-api-for-a-blog-service-with-nodejs-express-mongodb-and-mongoose

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts/", workoutRoutes);
app.use("/api/users/", userRoutes);

// connect to db
// Author: T.J. Crowder
// Date: 8 Oct 2021
// Title of source code: What kind of errors does this try-catch block handle?
// Type: source code
// Web address: https://stackoverflow.com/questions/69495205/what-kind-of-errors-does-this-try-catch-block-handle
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and listening on port 4000");
    })
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));
