import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkID: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false, // Make email optional in case Clerk doesn't provide it
      unique: true,
      sparse: true, // Only enforce uniqueness if field exists
    },
    username: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false, // Make photo optional
      default: "", // Provide default empty string
    },
    firstname: {
      type: String,
      required: false,
      default: "",
    },
    lastname: {
      type: String,
      required: false,
      default: "",
    },
    creditBalance: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

const userModel = mongoose.models.user || mongoose.model("User", userSchema);

export default userModel;
