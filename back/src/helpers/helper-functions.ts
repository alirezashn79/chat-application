import { Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import { CustomError } from "../types";

export const getAvatar = (firstName: string, lastName: string) => {
  return `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
};

function generateToken(payload: Record<string, string>) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY!);
  } catch (e) {
    console.log("jwt token generation failed");
    return null;
  }
}

export function setCookie(res: Response, userId: string) {
  const token = generateToken({ userId });
  if (!token) throw new Error("Could not set the token from the server");
  res.cookie("token", token, {
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: false,
    httpOnly: true,
  });
}

export function omitFields<T, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const newObj = { ...obj };

  keys.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
}

export function createError(message: string, statusCode = 500): CustomError {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function getUserIdFromToken(token: string) {
  const verifiedToken = verify(token, process.env.JWT_SECRET_KEY!) as {
    userId: string;
  };

  return verifiedToken.userId;
}
