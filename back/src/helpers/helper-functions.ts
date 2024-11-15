import { Response } from "express";
import jwt from "jsonwebtoken";

export function handleError(res: Response, error: unknown) {
  if (error instanceof Error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

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
