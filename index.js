const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoute = require("./routes/todoRoutes");
const dotenv = require("dotenv");

//Initialize dotenv Access
dotenv.config();
const port = process.env.API_PORT || process.env.MY_PORT;
const mongoDBUrl = process.env.MONGODB_URL;
const allowedUrls = process.env.ALLOWED_URLS.split(",");

//Initialize Express
const app = express();
app.use(express.json());

//Define the explicite origins which are allowed for the backend access
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedUrls.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
  })
);

//Connect MongoDB via Mongoose
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("DB Connection Successful.");
  })
  .catch((err) => {
    console.log("DB connection Failed", err.message);
  });

//Define Routes
app.use("/", todoRoute);

//Define Route for all Others
app.all("*", (req, res) => {
  res.status(404).send("Resources You are looking for is not not found!");
});

app.listen(port, () => {
  console.log(`Express is listening on port ${port}..`);
});
