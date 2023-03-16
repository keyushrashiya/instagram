import express from "express";
import userController from "../controller/userController.js";
import userValidator from "../validator/userValidator.js";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
const route = express.Router();

// Public Route
route.post(
  "/register",
  userValidator.registerValidate,
  userController.registerUser
);
route.post("/login", userValidator.loginValidate, userController.loginUser);
route.get("/verify/:token", userController.verifyUser);
route.post(
  "/forgot-password",
  userValidator.forgotPassValidate,
  userController.forgotPassUser
);
route.post(
  "/reset-password/:token",
  userValidator.resetPassValidate,
  userController.resetPassUser
);

// Private Route
route.post(
  "/change-password",
  authenticationMiddleware,
  userValidator.changePassValidate,
  userController.changePassUser
);
route.patch(
  "/edit-profile",
  authenticationMiddleware,
  userValidator.editUserValidate,
  userController.editUserUser
);

export default route;
