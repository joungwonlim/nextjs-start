import { db } from "@/db";
import * as schema from "@/db/schema";
import { getTableName, sql, Table } from "drizzle-orm";
import * as seeds from "./seeds";

const resetTable = async (table: Table) => {
  const result = await db.execute(
    sql.raw(`TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE`)
  );
  console.log(`TRUNCATE TABLE "${getTableName(table)}" completed`);
  return result;
};

const seed = async () => {
  for (const table of [schema.user]) {
    // [
    //   schema.user,
    //   schema.menuItem,
    //   schema.category,
    // ]

    await resetTable(table).then(async () => {
      await seeds[getTableName(table)]();
    });
  }
};

seed();
