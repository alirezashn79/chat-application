import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { userSchema } from "./schemas/user";
import { DB_URL } from "../helpers/constants";

function database() {
  try {
    const pool = new Pool({
      connectionString: DB_URL,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 30000,
    });

    const combinedSchemas = {
      ...userSchema,
    };

    const db: NodePgDatabase<typeof combinedSchemas> = drizzle(pool, {
      schema: combinedSchemas,
    });
    return db;
  } catch (error) {
    console.log("DB error");
  }
}

export { database };
