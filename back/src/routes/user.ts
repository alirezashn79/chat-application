import { Router } from "express";
import { signInController, signUpController } from "../controllers/user";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);

export default userRouter;
