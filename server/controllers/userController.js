import { Webhook } from "svix";
// import userModel from "../models/userModel";
// API  Controller Function to Manage Clerk  User with database
import razorpay from "razorpay";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import crypto from "crypto";

// for http://localhost:3000/api/user/webhook
const clerkWebhook = async (req, res) => {
  try {
    //   create a Svix instance with the Clerk webhook secret
    const webhookSecret = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await webhookSecret.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    console.log("Webhook received:", type, data);
    switch (type) {
      case "user.created": {
        // Handle user creation
        const userData = {
          clerkID: data.id,
          email: data.email_addresses[0].email_address,
          username:
            data.username ||
            data.email_addresses[0].email_address.split("@")[0],
          photo: data.profile_image_url,
          firstname: data.first_name || "",
          lastname: data.last_name || "",
        };

        await userModel.create(userData);
        res.status(201).json({ message: "User created successfully" });

        break;
      }
      case "user.updated": {
        // Handle user updates
        const userData = {
          clerkID: data.id,
          email: data.email_addresses[0].email_address,
          username:
            data.username ||
            data.email_addresses[0].email_address.split("@")[0],
          photo: data.profile_image_url,
          firstname: data.first_name || "",
          lastname: data.last_name || "",
        };

        await userModel.findOneAndUpdate({ clerkID: data.id }, userData);
        res.status(200).json({ message: "User updated successfully" });
        break;
      }
      case "user.deleted": {
        // Handle user deletion
        await userModel.findOneAndDelete({ clerkID: data.id });
        res.status(200).json({ message: "User deleted successfully" });
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Clerk webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};

// API Controller Function to get user available credits
const userCredits = async (req, res) => {
  try {
    const { clerkID } = req.body;
    console.log("userCredits called with clerkID:", clerkID); // Debug log

    if (!clerkID) {
      console.log("No clerkID provided in request body"); // Debug log
      return res
        .status(400)
        .json({ success: false, error: "User ID not found in token" });
    }

    console.log("Searching for user with clerkID:", clerkID); // Debug log
    const userData = await userModel.findOne({ clerkID });

    if (!userData) {
      console.log("User not found in database for clerkID:", clerkID); // Debug log
      return res.status(404).json({ success: false, error: "User not found" });
    }

    console.log("User found, creditBalance:", userData.creditBalance); // Debug log
    res.status(200).json({
      success: true,
      credit: userData.creditBalance,
      setCredit: userData.creditBalance, // Add this for frontend compatibility
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch user credits" });
  }
};

// gateway for Razorpay payment
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  currency: process.env.CURRENCY,
});

// API to make Razorpay payment for user credits
const makeRazorpayPayment = async (req, res) => {
  try {
    const { clerkID, planID } = req.body;
    console.log("makeRazorpayPayment called with:", { clerkID, planID }); // Debug log
    console.log("planID type:", typeof planID, "value:", planID); // Debug log

    const userData = await userModel.findOne({ clerkID });
    if (!userData) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    let credits, plan, amount, date;
    const normalizedPlanID = planID?.toLowerCase();
    console.log("Normalized planID:", normalizedPlanID); // Debug log

    switch (normalizedPlanID) {
      case "basic":
        credits = 100;
        plan = "Basic";
        amount = 10;
        break;
      case "advanced":
        credits = 500;
        plan = "Advanced";
        amount = 50;
        break;
      case "business":
        credits = 5000;
        plan = "Business";
        amount = 250;
        break;
      default:
        console.log("Invalid planID:", planID, "normalized:", normalizedPlanID); // Debug log
        return res.status(400).json({
          success: false,
          error: "Invalid plan selected",
        });
    }
    console.log("Plan details set:", { credits, plan, amount }); // Debug log

    // create Razorpay order
    const transactionData = {
      clerkId: clerkID, // Fix: match model field name (lowercase 'd')
      plan,
      amount,
      credits,
      date: Date.now(), // Fix: use timestamp number instead of Date object
    };
    console.log("Creating transaction with data:", transactionData); // Debug log
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise for INR)
      currency: process.env.CURRENCY,
      receipt: newTransaction._id.toString(),
      notes: {
        clerkID,
        planID,
      },
    };

    try {
      const order = await razorpayInstance.orders.create(options);
      console.log("Razorpay order created:", order);
      res.status(200).json({
        success: true,
        order: {
          id: order.id,
          amount: order.amount, // Keep as paise (smallest currency unit)
          currency: process.env.CURRENCY || "INR",
          receipt: newTransaction._id.toString(),
        },
      });
    } catch (razorpayError) {
      console.error("Razorpay order creation error:", razorpayError);
      return res.status(500).json({
        success: false,
        error: "Failed to create payment order",
      });
    }
  } catch (error) {
    console.error("Error making Razorpay payment:", error);
    res.status(500).json({ success: false, error: "Payment failed" });
  }
};

// Helper function to verify Razorpay payment signature
const verifySignature = (payment_id, razorpay_order_id, signature) => {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + payment_id)
    .digest("hex");
  return expectedSignature === signature;
};

//API Controller Function to handle Clerk webhook, user credits, and Razorpay payment
const verifyRazorpayPayment = async (req, res) => {
  console.log("Payment verification request body:", req.body);

  // Extract payment details from Razorpay response
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    console.error("Missing payment details:", {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });
    return res.status(400).json({
      success: false,
      error: "Missing payment details",
    });
  }

  // Verify the payment signature with Razorpay
  const isValid = verifySignature(
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  );
  console.log("Signature verification result:", isValid);

  if (!isValid) {
    console.error("Invalid signature for payment:", razorpay_payment_id);
    return res.status(400).json({ success: false, error: "Invalid signature" });
  }

  // If valid, update user credits and transaction status
  try {
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log("Order info from Razorpay:", orderInfo);

    if (!orderInfo) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    if (orderInfo.status !== "paid") {
      console.error("Order status is not paid:", orderInfo.status);
      return res.status(400).json({ success: false, error: "Order not paid" });
    }

    // Find the transaction by _id (which was used as receipt)
    const transactionData = await transactionModel.findById(orderInfo.receipt);

    if (!transactionData) {
      console.error("Transaction not found for receipt:", orderInfo.receipt);
      return res
        .status(404)
        .json({ success: false, error: "Transaction not found" });
    }

    console.log("Found transaction:", transactionData);

    // Check if payment was already processed
    if (transactionData.payment) {
      console.log(
        "Payment already processed for transaction:",
        orderInfo.receipt
      );
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    // Update user credits
    const userData = await userModel.findOne({
      clerkID: transactionData.clerkId,
    });

    if (!userData) {
      console.error("User not found for clerkID:", transactionData.clerkId);
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const creditBalance = userData.creditBalance + transactionData.credits;
    console.log("Updating user credits:", {
      current: userData.creditBalance,
      adding: transactionData.credits,
      new: creditBalance,
    });

    await userModel.findOneAndUpdate(
      { clerkID: transactionData.clerkId },
      { creditBalance: creditBalance }
    );

    // Update transaction payment status
    await transactionModel.findByIdAndUpdate(orderInfo.receipt, {
      payment: true,
    });

    console.log(
      "Payment verification successful for user:",
      transactionData.clerkId
    );
    res
      .status(200)
      .json({ success: true, message: "Payment verification successful" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ success: false, error: "Payment verification failed" });
  }
};

export {
  clerkWebhook,
  userCredits,
  makeRazorpayPayment,
  verifyRazorpayPayment,
};
