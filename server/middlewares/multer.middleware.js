import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define uploads directory for local development
const uploadsDir = path.join(__dirname, "../uploads");

// Create uploads directory if it doesn't exist (for local development)
if (!fs.existsSync(uploadsDir)) {
  console.log("Creating uploads directory:", uploadsDir);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Use memory storage for Vercel (serverless) compatibility
// This stores files in memory instead of on disk
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export default upload; // 'image' is the field name in the form data
