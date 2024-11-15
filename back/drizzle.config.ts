import "dotenv/config";
import { Config } from "drizzle-kit";
import { DB_URL } from "./src/helpers/constants";

export default {
  dialect: "postgresql",
  schema: "src/db/schemas/*",
  out: "src/db/drizzle",
  dbCredentials: {
    url: DB_URL!,
  },
} satisfies Config;
