import { errorResponse, successResponse } from "../helper/apiResponse.js";
import commentModel from "../model/commentModel.js";
import userModel from "../model/userModel.js";
import postModel from "../model/postModel.js";

class commentController {
  static postComment = async (req, res) => {
    const userID = req.user._id;
    const postID = req.params.postId;
    try {
      const checkPost = await postModel.findById(postID);
      if (checkPost) {
        const doc = new commentModel({
          user: { id: userID },
          post: postID,
          comment: req.body.comment,
        });
        const result = await doc.save();
        return successResponse(res, 200, "success ", result);
      } else {
        return errorResponse(res, 400, "Something went wrong");
      }
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static getComment = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const queryOptions = {
      page: req.query.page || 0,
      limit: req.query.limit || 10,
    };
    try {
      let result;
      result = await commentModel
        .find({ post: id })
        .skip(queryOptions.page * queryOptions.limit)
        .limit(queryOptions.limit);
      for (let i = 0; i < result.length; i++) {
        const userData = await userModel
          .findById(result[i].user.id)
          .select(["username", "email", "-_id"]);
        result[i].user.data = userData;
        const check = result[i].likedBy.some(
          (item) => JSON.stringify(item.user) == JSON.stringify(user._id)
        );

        result[i].isLike = check;
      }

      return successResponse(res, 200, "success", result);
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await commentModel.findById(id);
      if (result) {
        if (JSON.stringify(result.user.id) != JSON.stringify(req.user._id)) {
          return errorResponse(
            res,
            400,
            "You don't have permission for run this action"
          );
        }
        await commentModel.findByIdAndDelete(id);
        return successResponse(res, 200, "Delete comment successfully");
      } else {
        return errorResponse(res, 400, "Comment dose not exist");
      }
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
  static patchComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
      const result = await commentModel.findByIdAndUpdate(
        id,
        {
          $set: { comment: comment },
        },
        { new: true }
      );
      if (result) {
        return successResponse(res, 200, "Update comment successfully", result);
      } else {
        return errorResponse(res, 400, "comment dose not exist");
      }
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static likeComment = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
      const comment = await commentModel.findById(id);
      if (comment.likedBy.some((item) => item.user.equals(user._id))) {
        comment.likeCtn--;
        await commentModel.findByIdAndUpdate(
          id,
          { $pull: { likedBy: { user: user._id } } },
          { new: true }
        );
      } else {
        comment.likeCtn++;
        comment.likedBy.push({ user: user._id });
      }
      const result = comment.save();
      if (result) {
        return successResponse(res, 200, "Like comment successfully", result);
      } else {
        return errorResponse(res, 400, "comment dose not exist");
      }
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
}
export default commentController;
