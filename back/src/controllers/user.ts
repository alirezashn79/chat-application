import { Request, Response } from "express";
import { handleError } from "../helpers/helper-functions";
import { signUpValidator } from "../validators";
import { signUpService } from "../services/user";

export async function signUpController(req: Request, res: Response) {
  try {
    const validationResult = await signUpValidator.parseAsync(req.body);

    const user = await signUpService(res, validationResult);

    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
}
