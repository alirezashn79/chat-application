import { Router } from "express";
import userRouter from "./user";

function createRouter() {
  const router = Router();
  router.use("/user", userRouter);
  return router;
}

export default createRouter;
