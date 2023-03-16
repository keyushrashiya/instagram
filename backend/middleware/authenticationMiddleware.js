import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/userModel.js";
import { errorResponse } from "../helper/apiResponse.js";
dotenv.config();
const authenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const checkToken = authorization?.startsWith("Bearer");
  if (authorization && checkToken) {
    const token = authorization.split(" ")[1];
    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return errorResponse(res, 400, "Authentication credentials were not provided.");
        } else {
          return decoded;
        }
      }
    );
    const user = await userModel.findById(tokenData.userId).select("-password");
    if (user) {
      req.user = user;
    } else {
      return errorResponse(res, 400, "User Not Found");
    }
  } else {
    return errorResponse(res, 400, "Authentication credentials were not provided.");
  }
  next();
};
export default authenticationMiddleware;
