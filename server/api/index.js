// api/index.js
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const connectDB = require("../config/mongodb");

const app = express();
app.use(express.json());
app.use(cors());

// connect to DB inside an async wrapper
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
})();

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

module.exports.handler = serverless(app);
