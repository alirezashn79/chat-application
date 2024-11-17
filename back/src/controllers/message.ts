import { NextFunction, Request, Response } from "express";
import { sendMessageService } from "../services/message";
import { getUserIdFromToken } from "../helpers/helper-functions";
import { messageValidator } from "../validators";

export async function sendMessageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.token;

    const senderId = getUserIdFromToken(token);
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
