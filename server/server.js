import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";

const app = express();
const PORT = process.env.PORT;
await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});
