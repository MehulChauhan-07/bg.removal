// api/index.js
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const connectDB = require("../config/mongodb");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
app.use(cors());

// connect to DB inside an async wrapper
connectDB()
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

// module.exports.handler = serverless(app);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app; // Export the app for serverless deployment
module.exports.handler = serverless(app); // Export the handler for serverless deployment
