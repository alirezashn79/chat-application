import { Router } from "express";
import {
  getUserController,
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
userRouter.get("/:id", privateRoute, getUserController);

export default userRouter;
