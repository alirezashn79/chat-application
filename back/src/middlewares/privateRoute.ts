import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types";
import { createError, getUserIdFromToken } from "../helpers/helper-functions";
import db from "../db";

export async function privateRoute(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    const customReq = req as CustomRequest;

    const token = customReq.cookies.token;

    if (!token) {
      throw createError("unauthorized, token not provided", 401);
    }

    const userId = getUserIdFromToken(token);

    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });

    if (!user) {
      throw createError("unauthorized, user not found", 401);
    }

    customReq.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
