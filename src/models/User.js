import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    avatarURL: { type: String, default: "" },
    fullName: { type: String, default: "" },
    phone: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["Male", "Female", "Not specified"],
      default: "Not specified",
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    location: {
      address: { type: String, default: "" },
      state: { type: String, default: "" },
      city: { type: String, default: "" },
      zipCode: { type: String, default: "" },
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
