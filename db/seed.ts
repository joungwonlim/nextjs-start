import { db } from "@/db";
import * as schema from "@/db/schema";
import { getTableName, sql, Table } from "drizzle-orm";
import * as seeds from "./seeds";

async function resetTable(table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE`)
  );
}

const seed = async () => {
  for (const table of [schema.user]) {
    // [
    //   schema.user,
    //   schema.menuItem,
    //   schema.category,
    // ]
    await resetTable(table).then(async () => {
      console.log(`TRUNCATE TABLE "${getTableName(table)}" completed`);
      await seeds[getTableName(table)]();
    });
  }
};

seed();
