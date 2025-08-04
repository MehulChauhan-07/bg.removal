import express from "express";
import { clerkWebhook } from "../controllers/userController.js";

const router = express.Router();

// Clerk webhook route
router.post("/webhook", clerkWebhook);

// Add more user routes here as needed
// router.get("/profile", getUserProfile);
// router.put("/profile", updateUserProfile);
// router.get("/credits", getUserCredits);

export default router;
