import { NextFunction, Request, Response } from "express";
import { signInValidator, signUpValidator } from "../validators";
import { signInService, signOutService, signUpService } from "../services/user";

export async function signUpController(
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
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
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    signOutService(res);
    res.status(200).json({ message: "user signed out successfully" });
  } catch (error) {
    next(error);
  }
}
