import { Router } from "express";
import {
  getUsersController,
  signInController,
  signOutController,
  signUpController,
} from "../controllers/user";
import { privateRoute } from "../middlewares/privateRoute";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);
userRouter.post("/signout", signOutController);
userRouter.get("/all", privateRoute, getUsersController);

export default userRouter;
