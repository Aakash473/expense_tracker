import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const sharedGroups = pgTable(
	"shared_groups",
	{
		id: uuid("id").defaultRandom().primaryKey(),

		name: text("name").notNull(),

		description: text("description"),

		createdBy: uuid("created_by").references(() => authUsers.id, {
			onDelete: "set null",
		}),

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
	(table) => [index("shared_groups_created_by_idx").on(table.createdBy)],
);
