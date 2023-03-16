import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  username: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  phone: { type: Number, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  image: { type: String, trim: true },
  bio: { type: String, trim: true },
  isVerify: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
