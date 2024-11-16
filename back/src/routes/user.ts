import { Router } from "express";
import {
  signInController,
  signOutController,
  signUpController,
} from "../controllers/user";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);
userRouter.post("/signout", signOutController);

export default userRouter;
