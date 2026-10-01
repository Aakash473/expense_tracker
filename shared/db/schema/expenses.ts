import {
    index,
    numeric,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

import { categories } from "./categories";

export const expenses = pgTable(
    "expenses",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        userId: uuid("user_id")
            .notNull()
            .references(() => authUsers.id, {
                onDelete: "cascade",
            }),

        categoryId: uuid("category_id")
            .notNull()
            .references(() => categories.id, {
                onDelete: "restrict",
            }),

        amount: numeric("amount", {
            precision: 12,
            scale: 2,
        }).notNull(),

        description: text("description"),

        createdAt: timestamp("created_at", {
            withTimezone: true,
        })
            .notNull()
            .defaultNow(),

        updatedAt: timestamp("updated_at", {
            withTimezone: true,
        })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },

    (table) => [
        index("expenses_category_id_idx").on(table.categoryId),

        index("expenses_user_spent_at_idx").on(
            table.userId,
        ),
    ],
);