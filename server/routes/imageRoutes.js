import express from "express";
import { removeBgImage } from "../controllers/imageController.js";
import userAuth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const imageRouter = express.Router();

// Test route to check if image routes are mounted
imageRouter.get("/test", (req, res) => {
  res.json({ success: true, message: "Image routes are working" });
});

imageRouter.post("/remove-bg", userAuth, upload.single("image"), removeBgImage);

export default imageRouter;
