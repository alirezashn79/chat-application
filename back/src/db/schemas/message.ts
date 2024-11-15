import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { conversationSchema } from "./conversation";

const messageSchema = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("senderId")
    .references(() => userSchema.id)
    .notNull(),
  receiverId: uuid("receiverId")
    .references(() => userSchema.id)
    .notNull(),
  conversationId: uuid("conversationId")
    .references(() => conversationSchema.id)
    .notNull(),
  content: varchar("content", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

type Message = InferSelectModel<typeof messageSchema>;
type NewMessage = InferInsertModel<typeof messageSchema>;

export type { Message, NewMessage };

export { messageSchema };
