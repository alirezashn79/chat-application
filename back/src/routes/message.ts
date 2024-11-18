import Router from "express";
import {
  getMessagesController,
  sendMessageController,
} from "../controllers/message";
import { privateRoute } from "../middlewares/privateRoute";

const messageRouter = Router();

messageRouter.post("/send/:receiverId", privateRoute, sendMessageController);
messageRouter.get("/get/:receiverId", privateRoute, getMessagesController);

export default messageRouter;
