import { pgTable, serial, timestamp, text, integer, boolean, varchar, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 系统表 - 保留 Supabase 系统表定义，不得删除或修改
export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
})

// 分类表
export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    icon: varchar("icon", { length: 10 }).notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index("categories_sort_order_idx").on(table.sortOrder),
  ]
)

// 知识库内容表
export const contents = pgTable(
  "contents",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").notNull().references(() => categories.id),
    title: varchar("title", { length: 200 }).notNull(),
    preview: text("preview").notNull(),
    content: text("content").notNull(),
    isFree: boolean("is_free").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
  },
  (table) => [
    index("contents_category_id_idx").on(table.categoryId),
    index("contents_is_free_idx").on(table.isFree),
  ]
)

// 解锁记录表
export const unlockRecords = pgTable(
  "unlock_records",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 100 }).notNull(),
    contentId: integer("content_id").notNull().references(() => contents.id),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index("unlock_records_user_id_idx").on(table.userId),
    index("unlock_records_content_id_idx").on(table.contentId),
  ]
)
