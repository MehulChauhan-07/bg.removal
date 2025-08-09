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
userRouter.post("/webhooks", clerkWebhook);
userRouter.get("/credits", userAuth, userCredits);
userRouter.get("/credit", userAuth, userCredits); // Add route that matches frontend call
userRouter.post("/payment", userAuth, makeRazorpayPayment); // Add route that matches frontend call
userRouter.post("/verify-payment", userAuth, verifyRazorpayPayment); // Add route that matches frontend call

export default userRouter;
