import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import comment from "./comment";
import user from "./user";

const post = pgTable("post", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const postRelations = relations(post, ({ one, many }) => ({
  users: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  comments: many(comment),
}));

export default post;
