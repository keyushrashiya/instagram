import Joi from "joi";
import { validateErrorResponse } from "../helper/apiResponse.js";
import postModel from "../model/postModel.js";

const options = {
  abortEarly: false,
  error: {
    wrap: {
      label: "",
    },
  },
};

class postValidator {
  static createPostValidate = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      url: Joi.string().required().label("url"),
      type: Joi.string().required().label("type"),
      description: Joi.string().label("description"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    next();
  };
  static updatePostValidate = async (req, res, next) => {

    const { id } = req.params;
    const validateSchema = Joi.object().keys({
      url: Joi.string().empty().label("url"),
      description: Joi.string().label("description"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    const post = await postModel.findById(id);
    if (post) {
      req.data = post;
    } else {
      const errorObj = {
        details: [
          {
            path: "url",
            message: "Post dose not exist",
          },
        ],
      };
      return validateErrorResponse(res, errorObj);
    }
    next();
  };

  static createCommentValidate = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      comment: Joi.string().required().label("comment"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    next();
  };

  static patchCommentValidate = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      comment: Joi.string().empty().label("comment"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateErrorResponse(res, error);
    }
    next();
  };
}

export default postValidator;
