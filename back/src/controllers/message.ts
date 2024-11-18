import { NextFunction, Request, Response } from "express";
import { sendMessageService } from "../services/message";
import { messageValidator } from "../validators";
import { CustomRequest } from "../types";

export async function sendMessageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customReq = req as CustomRequest;
    const senderId = customReq.user?.id;
    const receiverId = req.params.receiverId;
    const { content } = req.body;

    const body = { senderId, receiverId, content };
    const validationResult = await messageValidator.parseAsync(body);

    const message = await sendMessageService(res, validationResult);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}
