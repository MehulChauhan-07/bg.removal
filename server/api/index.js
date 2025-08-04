import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "../config/mongodb.js";
import userRoutes from "../routes/userRoutes.js";

const app = express();

// Connect to MongoDB
await connectDB().catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Background Removal API Server",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/user", userRoutes);

// Add more routes here as needed
// app.use("/api/upload", uploadRoutes);
// app.use("/api/payment", paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
