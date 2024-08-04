import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role", default: ["USER"] }],
});

export default mongoose.model("User", UserSchema);
