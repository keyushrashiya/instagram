import mongoose from "mongoose";

const likedBySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, default: Date.now },
});

const commentSchema = mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    data: { type: Object, default: {} },
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  comment: { type: String, trim: true },
  isLike: { type: Boolean, default: false },
  likeCtn: { type: Number, default: 0 },
  likedBy: [likedBySchema],
  date: { type: Date, default: Date.now },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
