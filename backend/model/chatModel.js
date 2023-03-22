import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  user: {
    userId: { type: mongoose.Schema.Types.ObjectId },
    userName: { type: String, default: "username" },
  },
  room: { type: String, required: true },
  message: { type: String, trim: true, required: true },
  date: { type: Date, default: Date.now() },
  time: {
    type: String,
    default:
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  },
});

const chatModel = mongoose.model("chat", chatSchema);

export default chatModel;
