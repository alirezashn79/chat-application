import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

const userSchema = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: varchar("lastName", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  avatar: varchar("avatar", { length: 256 }),
  lastSeenTime: timestamp("lastSeenTime", { mode: "string", precision: 0 })
    .defaultNow()
    .notNull(),
});

type User = Omit<InferSelectModel<typeof userSchema>, "password">;
type NewUser = InferInsertModel<typeof userSchema>;

export type { User, NewUser };

export { userSchema };
