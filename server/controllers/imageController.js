import formdata from "form-data";
import axios from "axios";
import fs from "fs";
import path from "path";
import userModel from "../models/userModel.js";

// controller for handling image background removal
const removeBgImage = async (req, res) => {
  try {
    console.log("Image removal request received:", {
      body: req.body,
      file: req.file
        ? {
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            buffer: req.file.buffer ? "Buffer exists" : "No buffer",
          }
        : "No file",
      headers: req.headers,
      method: req.method,
      path: req.path,
      url: req.originalUrl,
      route: req.route,
    });

    // Prefer auth-derived user over body (multer can overwrite req.body)
    const clerkID =
      req.user?.clerkID || res.locals?.clerkID || req.body?.clerkID;
    console.log("Request data:", {
      bodyClerkID: req.body?.clerkID,
      userClerkID: req.user?.clerkID,
      localsClerkID: res.locals?.clerkID,
      headers: Object.keys(req.headers),
      authHeader: req.headers.authorization ? "Present" : "Missing",
    });

    if (!clerkID) {
      console.log(
        "No clerkID found in request. Auth middleware may have failed.",
        "Body:",
        req.body,
        "User:",
        req.user
      );
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }
    console.log("Processing image for user:", clerkID);

    const user = await userModel.findOne({ clerkID });
    if (!user) {
      console.log("User not found with clerkID:", clerkID);
      return res.status(403).json({
        success: false,
        error: "User not found or unauthorized",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        error: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }

    if (!req.file) {
      console.log("No image file found in request");
      return res.status(400).json({
        success: false,
        error: "No image file found",
      });
    }

    // Check if we have a buffer (memory storage) or path (disk storage)
    let imageBuffer;
    if (req.file.buffer) {
      // Memory storage - use buffer directly
      imageBuffer = req.file.buffer;
      console.log("Using file buffer from memory storage");
    } else if (req.file.path) {
      // Disk storage - read file
      try {
        imageBuffer = fs.readFileSync(req.file.path);
        console.log("Read file from disk storage:", req.file.path);
      } catch (readError) {
        console.error("Error reading file from disk:", readError);
        return res.status(400).json({
          success: false,
          error: "Error reading uploaded file",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid file data",
      });
    }

    const formData = new formdata();
    formData.append("image_file", imageBuffer, {
      filename: req.file.originalname || "image.jpg",
      contentType: req.file.mimetype,
    });

    console.log(
      "Calling ClipDrop API with API key:",
      process.env.CLIPDROP_API_KEY ? "API key exists" : "API key missing"
    );

    if (!process.env.CLIPDROP_API_KEY) {
      console.error("CLIPDROP_API_KEY environment variable is missing");
      return res.status(500).json({
        success: false,
        error: "Server configuration error - missing API key",
        details: "Contact administrator",
      });
    }

    const { data } = await axios.post(
      `https://clipdrop-api.co/remove-background/v1`,
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    // save the result image
    const base64Image = Buffer.from(data, "binary").toString("base64");

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // update user's credit balance
    await userModel.findOneAndUpdate(
      { clerkID },
      { $inc: { creditBalance: -1 } }
    );

    // Get updated user data
    const updatedUser = await userModel.findOne({ clerkID });
    console.log("Credit balance updated:", updatedUser.creditBalance);

    res.status(200).json({
      success: true,
      resultImage,
      creditBalance: updatedUser.creditBalance, // return updated credit balance
      message: "Background removed successfully",
    });
  } catch (error) {
    console.error("Error removing background:", error);

    // Check for specific error types
    if (error.code === "ENOENT") {
      console.error("File not found error:", error.path);
      return res.status(400).json({
        success: false,
        error: "Image file not found or corrupted",
        details: error.message,
      });
    }

    if (error.response) {
      // API error response
      console.error("ClipDrop API error:", {
        status: error.response.status,
        data: error.response.data,
      });
      return res.status(500).json({
        success: false,
        error: "Background removal service error",
        details: `API returned ${error.response.status}`,
      });
    }

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return res.status(500).json({
        success: false,
        error: "Cannot connect to background removal service",
        details: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to remove background. Please try again later.",
      details: error.message,
    });
  }
};

export { removeBgImage };
