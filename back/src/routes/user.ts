import { Router } from "express";
import {
  getUsersController,
  signInController,
  signOutController,
  signUpController,
} from "../controllers/user";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);
userRouter.post("/signout", signOutController);
userRouter.get("/all", getUsersController);

export default userRouter;
