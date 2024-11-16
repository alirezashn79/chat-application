import db from "../db";
import { userSchema } from "../db/schemas/user";
import { eq, ne } from "drizzle-orm";

export async function findUserByEmail(email: string) {
  return db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);
}

export async function getAllUsersExceptMe(userId: string) {
  return db
    .select({
      id: userSchema.id,
      firstName: userSchema.firstName,
      lastName: userSchema.lastName,
      avatar: userSchema.avatar,
    })
    .from(userSchema)
    .where(ne(userSchema.id, userId));
}
