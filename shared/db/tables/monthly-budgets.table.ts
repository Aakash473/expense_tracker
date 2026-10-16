import { sql } from "drizzle-orm";
import {
	check,
	date,
	numeric,
	pgTable,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const monthlyBudgets = pgTable(
	"monthly_budgets",
	{
		id: uuid("id").defaultRandom().primaryKey(),

		userId: uuid("user_id")
			.notNull()
			.references(() => authUsers.id, {
				onDelete: "cascade",
			}),

		month: date("month", { mode: "string" }).notNull(),

		amount: numeric("amount", {
			precision: 12,
			scale: 2,
		}).notNull(),

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
		unique("monthly_budgets_user_month_unique").on(table.userId, table.month),

		check("monthly_budgets_amount_positive", sql`${table.amount} > 0`),

		check(
			"monthly_budgets_month_first_day",
			sql`extract(day from ${table.month}) = 1`,
		),
	],
);
