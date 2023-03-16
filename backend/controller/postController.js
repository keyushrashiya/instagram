import { errorResponse, successResponse } from "../helper/apiResponse.js";
import postModel from "../model/postModel.js";
import { join } from "path";
import fs from "fs";
import commentModel from "../model/commentModel.js";

class postController {
  static createPost = async (req, res) => {
    const { url, type, description } = req.body;
    
    const buffer = Buffer.from(url, "base64");
    const fileName = Date.now() + `${type == "image" ? ".jpg" : ".mp4"}`;
    const filePath = join(process.cwd(), "upload", "post", type, fileName);
    
    fs.writeFileSync(filePath, buffer, (err) => {
      console.log("error ==>", err);
      return errorResponse(res, 400, "Something went wrong", err);
    });
    try {
      const doc = new postModel({
        url: filePath,
        type: type,
        description: description,
        ref_id: req.user._id,
      });
      const result = await doc.save();
      return successResponse(res, 200, "post created successfully ", result);
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static retrievePost = async (req, res) => {
    const { id } = req.params;
    const { isMy, type } = req.query;
    const queryOptions = {
      page: req.query.page || 0,
      limit: req.query.limit || 10,
    };
    try {
      let result;
      if (id) {
        result = await postModel.find({ _id: id });
      } else if (isMy) {
        result = await postModel.find({ ref_id: req.user._id });
      } else if (type) {
        result = await postModel.find({ type: type });
      } else {
        result = await postModel
          .find()
          .skip(queryOptions.page * queryOptions.limit)
          .limit(queryOptions.limit);
      }

      for (let i = 0; i < result.length; i++) {
        const check = await result[i].likedBy.some(
          (item) => JSON.stringify(item.user) === JSON.stringify(req.user._id)
        );
        result[i].isLike = check;
      }
      return successResponse(res, 200, "successfully", result);
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static updatePost = async (req, res) => {
    const { url, description } = req.body;
    const post = req.data;
    try {
      const postData = await postModel.findById(post._id);
      if (postData.ref_id != req.user._id) {
        return errorResponse(
          res,
          400,
          "You don't have permission for run this action"
        );
      }

      if (url != undefined) {
        const buffer = Buffer.from(url, "base64");
        const fileName =
          Date.now() + `${post.type == "image" ? ".jpg" : ".mp4"}`;
        const filePath = join(
          process.cwd(),
          "upload",
          "post",
          post.type,
          fileName
        );
        fs.writeFileSync(filePath, buffer, (err) => {
          console.log("error ==>", err);
          return errorResponse(res, 400, "Something went wrong", err);
        });
        fs.unlinkSync(post.url);
        const result = await postModel.findByIdAndUpdate(
          post._id,
          { $set: { ...req.body, url: filePath } },
          { new: true }
        );
      }
      const result = await postModel.findByIdAndUpdate(
        post._id,
        { $set: { description: description } },
        { new: true }
      );
      return successResponse(res, 200, "post updated successfully", result);
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
  static deletePost = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await postModel.findById(id);
      if (result) {
        if (result.ref_id != req.user._id) {
          return errorResponse(
            res,
            400,
            "You don't have permission for run this action"
          );
        }
        fs.unlinkSync(result.url);
        await postModel.findByIdAndDelete(id);
        await commentModel.deleteMany({ post: id });
        return successResponse(res, 200, "Delete post successfully");
      } else {
        return errorResponse(res, 400, "Post dose not exist");
      }
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static likePost = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
      const post = await postModel.findById(id);
      if (post.likedBy.some((item) => item.user.equals(user._id))) {
        post.like_ctn--;
        await postModel.findByIdAndUpdate(
          id,
          { $pull: { likedBy: { user: user._id } } },
          { new: true }
        );
      } else {
        post.like_ctn++;
        post.likedBy.push({ user: user._id });
      }
      const result = await post.save();
      return successResponse(res, 200, "Like post successfully", result);
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
}
export default postController;
