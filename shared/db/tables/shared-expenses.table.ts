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

export const sharedExpenses = pgTable(
	"shared_expenses",
	{
		id: uuid("id").defaultRandom().primaryKey(),

		groupId: uuid("group_id")
			.notNull()
			.references(() => sharedGroups.id, {
				onDelete: "cascade",
			}),

		description: text("description").notNull(),

		amount: numeric("amount", {
			precision: 12,
			scale: 2,
		}).notNull(),

		paidBy: uuid("paid_by")
			.notNull()
			.references(() => authUsers.id, {
				onDelete: "restrict",
			}),

		createdBy: uuid("created_by")
			.notNull()
			.references(() => authUsers.id, {
				onDelete: "restrict",
			}),

		spentAt: timestamp("spent_at", {
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),

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
		index("shared_expenses_group_spent_at_idx").on(
			table.groupId,
			table.spentAt,
		),
		index("shared_expenses_paid_by_idx").on(table.paidBy),
	],
);
