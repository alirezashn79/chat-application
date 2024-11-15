import { Router } from "express";
import { signUpController } from "../controllers/user";

const userRouter = Router();

userRouter.post("/signup", signUpController);

export default userRouter;
