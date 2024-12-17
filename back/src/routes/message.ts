import Router from "express";
import {
  getMessagesController,
  getUnreadMessages,
  sendMessageController,
} from "../controllers/message";
import { privateRoute } from "../middlewares/privateRoute";

const messageRouter = Router();

messageRouter.post("/send/:receiverId", privateRoute, sendMessageController);
messageRouter.get("/get/:receiverId", privateRoute, getMessagesController);
messageRouter.get("/unreadMessages", privateRoute, getUnreadMessages);

export default messageRouter;
