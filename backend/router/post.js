import express from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
import postValidator from "../validator/postValidator.js";
import postController from "../controller/postController.js";
import commentController from "../controller/commentController.js";
const route = express.Router();

// Private Route
route.post(
  "/",
  authenticationMiddleware,
  postValidator.createPostValidate,
  postController.createPost
);
route.get("/:id?", authenticationMiddleware, postController.retrievePost);
route.patch(
  "/:id",
  authenticationMiddleware,
  postValidator.updatePostValidate,
  postController.updatePost
);
route.delete("/:id", authenticationMiddleware, postController.deletePost);
route.patch("/like/:id", authenticationMiddleware, postController.likePost);

// Comment Module
route.post(
  "/comment/:postId",
  authenticationMiddleware,
  postValidator.createCommentValidate,
  commentController.postComment
);
route.get(
  "/comment/:id",
  authenticationMiddleware,
  commentController.getComment
);
route.delete(
  "/comment/:id",
  authenticationMiddleware,
  commentController.deleteComment
);
route.patch(
  "/comment/:id",
  authenticationMiddleware,
  postValidator.patchCommentValidate,
  commentController.patchComment
);
route.patch(
  "/comment/like/:id",
  authenticationMiddleware,
  commentController.likeComment
);

export default route;
