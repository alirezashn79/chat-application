import { CustomError } from "../types";
import { NextFunction, Request, Response } from "express";

export async function errorHandler(
  err: CustomError,
  _: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
}
