import express from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
import chatController from '../controller/chatController.js';

const route = express.Router();

route.get("/:room", authenticationMiddleware, chatController.getChat);
route.delete("/:id",authenticationMiddleware,  chatController.deleteChat);
route.delete("/message/:id",authenticationMiddleware,  chatController.deleteChatMessage);

export default route