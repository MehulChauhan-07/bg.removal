const clerkWebhook = async (req, res) => {
  try {
    // Add your webhook logic here
    res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("Clerk webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};

export { clerkWebhook };
