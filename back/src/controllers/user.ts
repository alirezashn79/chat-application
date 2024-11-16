import { Request, Response } from "express";
import { handleError } from "../helpers/helper-functions";
import { signInValidator, signUpValidator } from "../validators";
import { signInService, signUpService } from "../services/user";

export async function signUpController(req: Request, res: Response) {
  try {
    const validationResult = await signUpValidator.parseAsync(req.body);

    const user = await signUpService(res, validationResult);

    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
}

export async function signInController(req: Request, res: Response) {
  try {
    const validationResult = await signInValidator.parseAsync(req.body);
    const user = await signInService(res, validationResult);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
}
