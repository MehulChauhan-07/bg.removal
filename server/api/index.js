// /api/index.js
const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

import cors from "cors";
import connectDB from "../config/mongodb.js";

await connectDB();
// Sample route
app.get("/", (req, res) => {
  res.send({ message: "Hello from Express on Vercel!" });
});

module.exports.handler = serverless(app);
