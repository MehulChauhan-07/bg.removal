import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
try {
  await connectDB();
  console.log("MongoDB Connected Successfully");
} catch (error) {
  console.error("MongoDB connection failed:", error);
}

// Basic middleware
app.use(cors());
app.use(express.json());
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
app.use(express.urlencoded({ extended: true }));

// CORS configuration
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // Allow any origin in development
        callback(null, true);
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "X-CSRF-Token",
      ],
    })
  );
} else {
  app.use(cors({ credentials: true, origin: allowedOrigins }));
}

// Ensure preflight requests don't 404
app.options("*", cors());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Basic routes
app.get("/", (req, res) => {
  res.json({ message: "Background Removal API Server", status: "running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Mount API routers
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
