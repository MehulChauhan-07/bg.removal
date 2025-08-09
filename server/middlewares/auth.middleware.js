import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.substring(7) // Remove 'Bearer ' prefix
        : req.headers.token; // Fallback to direct token header

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized, Login again" });
    }

    // Decode the JWT token (Clerk tokens don't need verification here)
    const decoded = jwt.decode(token);
    console.log("Decoded token:", decoded); // Debug log

    if (!decoded) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    // Clerk uses 'sub' for user ID, but let's check both
    const clerkID = decoded.sub || decoded.clerkID || decoded.user_id;

    if (!clerkID) {
      console.log(
        "No user ID found in token. Token structure:",
        Object.keys(decoded)
      );
      return res
        .status(401)
        .json({ success: false, error: "User ID not found in token" });
    }

    // Ensure req.body exists for GET requests
    if (!req.body) {
      req.body = {};
    }
    req.body.clerkID = clerkID;
    req.user = { clerkID }; // Also store in req.user for consistency
    console.log("Auth middleware: Setting clerkID in req.body:", clerkID);
    console.log("Auth middleware: req.body after setting:", req.body);
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth;
