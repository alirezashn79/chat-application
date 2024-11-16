import { signInValidator, signUpValidator } from "../validators";
import { z } from "zod";
import { NewUser, User, userSchema } from "../db/schemas/user";
import db from "../db";
import { getAvatar, omitFields, setCookie } from "../helpers/helper-functions";
import { compare, genSalt, hash } from "bcryptjs";
import { Response } from "express";
import { findUserByEmail } from "../helpers/db-helpers";

type SignUpType = z.infer<typeof signUpValidator>;
type SignInType = z.infer<typeof signInValidator>;

export async function signUpService(res: Response, body: SignUpType) {
  const isUserExist = await findUserByEmail(body.email);

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

export async function signInService(res: Response, body: SignInType) {
  const findUser = await findUserByEmail(body.email);

  const validPassword = await compare(
    body.password,
    findUser[0]?.password ?? "",
  );

  if (!findUser.length || !validPassword) {
    throw new Error("401");
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, body.email),
  });

  if (!user) {
    throw new Error("401");
  }

  setCookie(res, user.id);
  const userWithoutPassword = omitFields<NewUser, keyof NewUser>(user, [
    "password",
  ]);
  return userWithoutPassword;
}
