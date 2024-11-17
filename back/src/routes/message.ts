import Router from "express";
import { sendMessageController } from "../controllers/message";

const messageRouter = Router();

messageRouter.post("/send/:receiverId", sendMessageController);

export default messageRouter;
