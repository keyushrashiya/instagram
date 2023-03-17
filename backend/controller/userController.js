import { successResponse, errorResponse } from "../helper/apiResponse.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";
import fs, { unlinkSync } from "fs";
import { join } from "path";

dotenv.config();

class userController {
  static registerUser = async (req, res) => {
    const { name, username, email, phone, dob, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const doc = new userModel({
        name: name,
        username: username,
        email: email,
        phone: phone,
        dob: dob,
        password: hashPassword,
      });
      const result = await doc.save();
      const token = await jwt.sign(
        { userId: result._id },
        process.env.JWT_SECRET_KEY
      );
      const link = `http://192.168.100.6:3000/api/user/verify/${token}`;

      let html = fs.readFileSync(
        join(process.cwd(), "views", "mail", "Verify_mail.html"),
        "utf-8"
      );
      const dynamicData = {
        name: result.name,
        email: email,
        link: link,
      };
      Object.keys(dynamicData).forEach((key) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
        html = html.replace(regex, dynamicData[key]);
      });
      const mailSend = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "verify Account",
        html: html,
      });

      return successResponse(
        res,
        201,
        "Account created successfully. please open verification mail and verify your account",
        result
      );
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static verifyUser = async (req, res) => {
    const { token } = req.params;
    try {
      const verifyToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            return errorResponse(res, 400, "Authorization failed");
          } else {
            return decoded;
          }
        }
      );
      await userModel.findByIdAndUpdate(verifyToken.userId, {
        $set: { isVerify: true },
      });
      return successResponse(res, 200, "user verified successfully");
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static resetPassUser = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const verifyToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            return errorResponse(res, 400, "Authorization failed");
          } else {
            return decoded;
          }
        }
      );
      const result = await userModel.findByIdAndUpdate(verifyToken.userId, {
        $set: { password: hashPassword },
      });
      const afterResult = await userModel
        .findById(result._id)
        .select("-password");
      return successResponse(
        res,
        200,
        "Reset password successfully",
        afterResult
      );
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static editUserUser = async (req, res) => {
    const { image } = req.body;
    const user = req.user;

    if (image) {
      const buffer = Buffer.from(image, "base64");
      const fileName = Date.now() + ".jpg";
      const filePath = join(process.cwd(), "upload", "profile", fileName);
      fs.writeFileSync(filePath, buffer, (err) => {
        if (err) {
          console.log("error ==>", err);
          return errorResponse(res, 400, "Something went wrong", err);
        }
      });
      fs.unlinkSync(req.user.image);
      req.body["image"] = filePath;
    }
    try {
      const result = await userModel.findByIdAndUpdate(
        user._id,
        {
          $set: { ...req.body },
        },
        { new: true }
      );
      const afterResult = await userModel
        .findById(result._id)
        .select("-password");
      return successResponse(
        res,
        200,
        "Profile update successfully",
        afterResult
      );
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
  static changePassUser = async (req, res) => {
    const { password } = req.body;
    const user = req.user;
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await userModel.findByIdAndUpdate(user._id, {
        $set: { password: hashPassword },
      });
      const afterResult = await userModel
        .findById(result._id)
        .select("-password");
      return successResponse(
        res,
        200,
        "Reset password successfully",
        afterResult
      );
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static forgotPassUser = async (req, res) => {
    const { email } = req.body;
    const user = req.user;
    try {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30m",
      });
      const link = `http://localhost:3000/api/user/reset-password/${token}`;

      let html = fs.readFileSync(
        join(process.cwd(), "views", "mail", "forgot_mail.html"),
        "utf-8"
      );
      const dynamicData = {
        name: user.name,
        email: email,
        link: link,
      };
      Object.keys(dynamicData).forEach((key) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
        html = html.replace(regex, dynamicData[key]);
      });
      const mailSend = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Reset Password",
        html: html,
      });

      return successResponse(
        res,
        200,
        "Reset password mail successfully sended..!"
      );
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };

  static loginUser = async (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      return successResponse(res, 200, "Login successfully", {
        user,
        token: token,
      });
    } catch (error) {
      console.log("error ==>", error);
      return errorResponse(res, 400, "Something went wrong", error);
    }
  };
}
export default userController;
