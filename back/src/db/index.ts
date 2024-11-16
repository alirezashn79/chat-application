import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { userSchema } from "./schemas/user";
import { DB_URL } from "../helpers/constants";
import { messageSchema } from "./schemas/message";
import { conversationSchema } from "./schemas/conversation";
import { userConversationSchema } from "./schemas/user-conversation";

const pool = new Pool({
  connectionString: DB_URL,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});

const combinedSchemas = {
  users: userSchema,
  messages: messageSchema,
  conversations: conversationSchema,
  userConversations: userConversationSchema,
};

const db: NodePgDatabase<typeof combinedSchemas> = drizzle(pool, {
  schema: combinedSchemas,
});

export default db;
