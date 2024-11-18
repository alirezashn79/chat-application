import Router from "express";
import { sendMessageController } from "../controllers/message";
import { privateRoute } from "../middlewares/privateRoute";

const messageRouter = Router();

messageRouter.post("/send/:receiverId", privateRoute, sendMessageController);

export default messageRouter;
