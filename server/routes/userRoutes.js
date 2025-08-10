import express from "express";
import {
  clerkWebhook,
  makeRazorpayPayment,
  userCredits,
  verifyRazorpayPayment,
} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.middleware.js";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// Clerk webhook route
userRouter.post("/webhook", clerkWebhook);
userRouter.post("/webhooks", clerkWebhook); // Keep both for compatibility

// Simple webhook test endpoint
userRouter.post("/webhook-test", (req, res) => {
  console.log("🧪 Webhook test endpoint hit");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.json({ message: "Webhook test endpoint working", received: req.body });
});

// Test endpoint to manually create a user (for debugging)
userRouter.post("/test-create-user", async (req, res) => {
  try {
    const { clerkID, email, username, firstname, lastname } = req.body;
    console.log("🧪 Test creating user with:", {
      clerkID,
      email,
      username,
      firstname,
      lastname,
    });

    const userData = {
      clerkID,
      email: email || "",
      username: username || email?.split("@")[0] || "user",
      photo: "",
      firstname: firstname || "",
      lastname: lastname || "",
      creditBalance: 5,
    };

    const existingUser = await userModel.findOne({ clerkID });
    if (existingUser) {
      return res.json({ message: "User already exists", user: existingUser });
    }

    const newUser = await userModel.create(userData);
    console.log("✅ Test user created:", newUser);
    res.json({ message: "Test user created successfully", user: newUser });
  } catch (error) {
    console.error("❌ Test user creation failed:", error);
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/credits", userAuth, userCredits);
userRouter.get("/credit", userAuth, userCredits); // Add route that matches frontend call

// Debug endpoint to check if user exists
userRouter.get("/check-user/:clerkID", async (req, res) => {
  try {
    const { clerkID } = req.params;
    console.log("🔍 Checking if user exists:", clerkID);

    const user = await userModel.findOne({ clerkID });
    if (user) {
      console.log("✅ User found:", user);
      res.json({ exists: true, user });
    } else {
      console.log("❌ User not found");
      res.json({ exists: false, user: null });
    }
  } catch (error) {
    console.error("❌ Error checking user:", error);
    res.status(500).json({ error: error.message });
  }
});
userRouter.post("/payment", userAuth, makeRazorpayPayment); // Add route that matches frontend call
userRouter.post("/verify-payment", userAuth, verifyRazorpayPayment); // Add route that matches frontend call

export default userRouter;
