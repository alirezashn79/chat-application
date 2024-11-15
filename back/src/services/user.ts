import { signUpValidator } from "../validators";
import { z } from "zod";
import { NewUser, userSchema } from "../db/schemas/user";
import db from "../db";
import { eq } from "drizzle-orm";
import { getAvatar, omitFields, setCookie } from "../helpers/helper-functions";
import { genSalt, hash } from "bcryptjs";
import { Response } from "express";

type SignUpType = z.infer<typeof signUpValidator>;

export async function signUpService(res: Response, body: SignUpType) {
  const isUserExist = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, body.email));

  if (isUserExist.length) {
    throw new Error("User already exists");
  }

  const avatar = getAvatar(body.firstName, body.lastName);

  const salt = await genSalt(10);
  const password = await hash(body.password, salt);

  const newUserData: NewUser = {
    ...body,
    password,
    avatar,
  };

  const newUser = await db.insert(userSchema).values(newUserData).returning();

  if (!newUser.length) {
    throw new Error("signup user error");
  }

  setCookie(res, newUser[0].id);

  const userWithoutPassword = omitFields<NewUser, keyof NewUser>(newUser[0], [
    "password",
  ]);

  return userWithoutPassword;
}
