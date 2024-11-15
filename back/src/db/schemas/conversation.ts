import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

const conversationSchema = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

type Conversation = InferSelectModel<typeof conversationSchema>;
type NewConversation = InferInsertModel<typeof conversationSchema>;

export type { Conversation, NewConversation };

export { conversationSchema };
