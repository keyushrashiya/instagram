import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, default: Date.now },
});

const postSchema = mongoose.Schema({
  url: { type: String, trim: true, required: true },
  type: { type: String, required: true },
  description: { type: String, trim: true },
  ref_id: { type: String, required: true },
  like_ctn: { type: Number, default: 0 },
  likedBy: [likeSchema],
  comment_ctn: { type: Number, default: 0 },
  isArchive: { type: Boolean, default: false },
  isLike: { type: Boolean, default: false },
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
