import { sql } from "drizzle-orm";
import {
	check,
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

		paidBy: uuid("paid_by").references(() => authUsers.id, {
			onDelete: "set null",
		}),

		paidTo: uuid("paid_to").references(() => authUsers.id, {
			onDelete: "set null",
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
		check("shared_settlements_amount_positive", sql`${table.amount} > 0`),

		check(
			"shared_settlements_no_self_payment",
			sql`${table.paidBy} IS NULL OR ${table.paidTo} IS NULL OR ${table.paidBy} <> ${table.paidTo}`,
		),
	],
);
