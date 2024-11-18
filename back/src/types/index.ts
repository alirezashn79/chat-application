import { Request } from "express";
import { User } from "../db/schemas/user";
export interface CustomError extends Error {
  statusCode?: number;
}
export interface CustomRequest extends Request {
  user: User;
}
