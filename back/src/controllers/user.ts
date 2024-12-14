import { NextFunction, Request, Response } from "express";
import { signInValidator, signUpValidator } from "../validators";
import {
  getUserService,
  getUsersService,
  signInService,
  signOutService,
  signUpService,
} from "../services/user";
import { CustomRequest } from "../types";

export async function signUpController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationResult = await signUpValidator.parseAsync(req.body);

    const user = await signUpService(res, validationResult);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function signInController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationResult = await signInValidator.parseAsync(req.body);
    const user = await signInService(res, validationResult);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function signOutController(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    signOutService(res);
    res.status(200).json({ message: "user signed out successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customReq = req as CustomRequest;
    const authUserId = customReq.user?.id;
    const users = await getUsersService(authUserId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.id;
    const user = await getUserService(userId);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}
