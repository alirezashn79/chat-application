import { NextFunction, Request, Response } from "express";
import {
  getMessagesService,
  sendMessageService,
  unreadMessagesService,
} from "../services/message";
import { messageValidator } from "../validators";
import { CustomRequest } from "../types";

export async function sendMessageController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customReq = req as CustomRequest;
    const senderId = customReq.user?.id;
    const receiverId = req.params.receiverId;
    const { content } = req.body;

    const body = { senderId, receiverId, content };
    const validationResult = await messageValidator.parseAsync(body);

    const message = await sendMessageService(validationResult);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

export async function getMessagesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customReq = req as CustomRequest;
    const senderId = customReq.user?.id;
    const receiverId = customReq.params.receiverId;
    const userIDs = { senderId, receiverId };
    const messages = await getMessagesService(userIDs);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
}

export async function getUnreadMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customReq = req as CustomRequest;
    const receiverId = customReq.user?.id;

    const unreadMessages = await unreadMessagesService(receiverId);
    res.status(200).send(unreadMessages);
  } catch (error) {
    next(error);
  }
}
