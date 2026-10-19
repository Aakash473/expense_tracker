import {
    index,
    numeric,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

import { sharedGroups } from "./shared-groups.table";

export const sharedSettlements = pgTable(
    "shared_settlements",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        groupId: uuid("group_id")
            .notNull()
            .references(() => sharedGroups.id, {
                onDelete: "cascade",
            }),

        paidBy: uuid("paid_by")
            .notNull()
            .references(() => authUsers.id, {
                onDelete: "restrict",
            }),

        paidTo: uuid("paid_to")
            .notNull()
            .references(() => authUsers.id, {
                onDelete: "restrict",
            }),

        amount: numeric("amount", {
            precision: 12,
            scale: 2,
        }).notNull(),

        note: text("note"),

        createdAt: timestamp("created_at", {
            withTimezone: true,
        })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        index("shared_settlements_group_created_at_idx").on(
            table.groupId,
            table.createdAt,
        ),
        index("shared_settlements_paid_by_idx").on(table.paidBy),
        index("shared_settlements_paid_to_idx").on(table.paidTo),
    ],
);