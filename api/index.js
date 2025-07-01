const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const connectDB = require("../server/config/mongodb.js");

const app = express();
app.use(express.json());
app.use(cors());

connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Sample route
app.get("/", (req, res) => {
  res.send({ message: "Hello from Express on Vercel!" });
});

module.exports.handler = serverless(app);
