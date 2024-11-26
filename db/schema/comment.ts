import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import post from "./post";
import user from "./user";

const comment = pgTable("comment", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  postId: uuid("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  content: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const commentRelations = relations(comment, ({ one }) => ({
  users: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
  posts: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
}));

export default comment;
