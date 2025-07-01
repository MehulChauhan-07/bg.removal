import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    // unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    // required: true,
  },
  lastname: {
    type: String,
    // required: true,
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
});

export default mongoose.model("User", userSchema);
