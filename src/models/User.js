import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  role: {
    type: String,
    enum: ["user", "driver", "hospital", "admin"],
    default: "user",
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);