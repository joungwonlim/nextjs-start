import { db } from "@/db";
import { user } from "../schema";
import users from "./data/users.json";

const seed = async () => {
  await db.insert(user).values(users);
  console.log("[user] seed data insert success");
};

export default seed;
