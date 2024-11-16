import db from "../db";
import { userSchema } from "../db/schemas/user";
import { eq } from "drizzle-orm";

export async function findUserByEmail(email: string) {
  return db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);
}
