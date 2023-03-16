import Joi from "joi";
import { validateErrorResponse } from "../helper/apiResponse.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
const options = {
  abortEarly: false,
  error: {
    wrap: {
      label: "",
    },
  },
};
class userValidator {
  static registerValidate = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      name: Joi.string().required().label("name"),
      username: Joi.string().required().label("username"),
      email: Joi.string().email().required().label("email"),
      phone: Joi.number().required().label("phone"),
      dob: Joi.date().required().label("dob"),
      password: Joi.string().required().label("password"),
      confirm_password: Joi.ref("password"),
      image: Joi.string().label("profile"),
      bio: Joi.string().label("bio"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const errorObj = {
        details: [
          {
            path: "email",
            message: "email is already exist",
          },
        ],
      };
      return validateErrorResponse(res, errorObj);
    }
    next();
  };
  static editUserValidate = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      name: Joi.string().empty().label("name"),
      username: Joi.string().empty().label("username"),
      phone: Joi.number().empty().label("phone"),
      dob: Joi.date().empty().label("dob"),
      image: Joi.string().label("profile"),
      bio: Joi.string().label("bio"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    next();
  };

  static forgotPassValidate = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      email: Joi.string().email().required().label("email"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      req.user = user;
    } else {
      const errorObj = {
        details: [
          {
            path: "email",
            message: "user with this email dose not exist",
          },
        ],
      };
      return validateErrorResponse(res, errorObj);
    }
    next();
  };

  static resetPassValidate = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      password: Joi.string().required().label("password"),
      confirm_password: Joi.ref("password"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    next();
  };
  static changePassValidate = async (req, res, next) => {
    const { old_password, password } = req.body;
    const user = req.user;
    const validateSchema = Joi.object().keys({
      old_password: Joi.string().required().label("password"),
      password: Joi.string()
        .required()
        .label("password")
        .invalid(Joi.ref("old_password")),
      confirm_password: Joi.ref("password"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    const oldPass = await userModel.findById(user._id);
    const checkPass = await bcrypt.compare(old_password, oldPass.password);
    if (!checkPass) {
      const errorObj = {
        details: [
          {
            path: "password",
            message: "old password is wrong",
          },
        ],
      };
      return validateErrorResponse(res, errorObj);
    }
    next();
  };

  static loginValidate = async (req, res, next) => {
    const { email, password } = req.body;
    const validateSchema = Joi.object().keys({
      email: Joi.string().required().email().label("email"),
      password: Joi.string().required().label("password"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        if (user.isVerify) {
          const userData = await userModel
            .findById(user._id)
            .select("-password");

          req.user = userData;
        } else {
          const errorObj = {
            details: [
              {
                path: "email",
                message: "Verify your account first",
              },
            ],
          };
          return validateErrorResponse(res, errorObj);
        }
      } else {
        const errorObj = {
          details: [
            {
              path: "email",
              message: "Email or password is invalid",
            },
          ],
        };
        return validateErrorResponse(res, errorObj);
      }
    } else {
      const errorObj = {
        details: [
          {
            path: "email",
            message: "user not found",
          },
        ],
      };
      return validateErrorResponse(res, errorObj);
    }
    next();
  };
}
export default userValidator;
