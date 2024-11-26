import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    // eslint-disable-next-line n/no-process-env
    url: process.env.DATABASE_URL!,
  },
});
