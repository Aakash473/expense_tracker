import {
    index,
    numeric,
    pgTable,
    timestamp,
    unique,
    uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

import { sharedExpenses } from "./shared-expenses.table";

export const sharedExpenseSplits = pgTable(
    "shared_expense_splits",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        expenseId: uuid("expense_id")
            .notNull()
            .references(() => sharedExpenses.id, {
                onDelete: "cascade",
            }),

        userId: uuid("user_id")
            .notNull()
            .references(() => authUsers.id, {
                onDelete: "restrict",
            }),

        shareAmount: numeric("share_amount", {
            precision: 12,
            scale: 2,
        }).notNull(),

        createdAt: timestamp("created_at", {
            withTimezone: true,
        })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        unique("shared_expense_splits_expense_user_unique").on(
            table.expenseId,
            table.userId,
        ),
        index("shared_expense_splits_user_idx").on(table.userId),
    ],
);