import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { DB_URL } from "../helpers/constants";

async function main() {
  try {
    const pool = new Pool({
      connectionString: DB_URL,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 30000,
    });

    const db: NodePgDatabase = drizzle(pool);

    await migrate(db, {
      migrationsFolder: "src/db/drizzle",
    });
    console.log("migration successful");
    await pool.end();
  } catch (error) {
    console.log("database migration error", error);
  }
}

main();
