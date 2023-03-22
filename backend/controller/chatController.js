import chatModel from "../model/chatModel.js";
import { errorResponse, successResponse } from "../helper/apiResponse.js";
import userModel from "../model/userModel.js";

class chatController {
  static getChat = async (req, res) => {
    const pagination = {
      page: req.query.page,
      limit: req.query.limit,
    };

    try {
      const result = await chatModel
        .find({ room: req.params.room })
        .select("-__v")
        .limit(pagination.limit)
        .skip(pagination.page * pagination.limit);
      for (let i = 0; i < result.length; i++) {
        const user = await userModel
          .findById(result[i].user.userId)
          .select("username");
        result[i].user.userName = user.username;
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static deleteChatMessage = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const result = await chatModel.findByIdAndDelete(id);
      console.log(result);
      return successResponse(res, 200, "Deleted");
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
  static deleteChat = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await chatModel.deleteMany({ room: id });
      console.log(result);
      return successResponse(res, 200, "Deleted");
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
}

export default chatController;
