import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define uploads directory
const uploadsDir = path.join(__dirname, "../uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  console.log("Creating uploads directory:", uploadsDir);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// creating multer middleware for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadsDir); // Save to uploads folder
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname); // appending timestamp to the original file name
  },
});

const upload = multer({
  storage: storage,
});
export default upload; // 'image' is the field name in the form data
