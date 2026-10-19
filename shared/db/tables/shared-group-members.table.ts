import {
    index,
    pgEnum,
    pgTable,
    timestamp,
    unique,
    uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

import { sharedGroups } from "./shared-groups.table";

export const sharedGroupRole = pgEnum("shared_group_role", [
    "owner",
    "member",
]);

export const sharedGroupMemberStatus = pgEnum(
    "shared_group_member_status",
    ["pending", "accepted", "left"],
);

export const sharedGroupMembers = pgTable(
    "shared_group_members",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        groupId: uuid("group_id")
            .notNull()
            .references(() => sharedGroups.id, {
                onDelete: "cascade",
            }),

        userId: uuid("user_id")
            .notNull()
            .references(() => authUsers.id, {
                onDelete: "cascade",
            }),

        role: sharedGroupRole("role").notNull().default("member"),

        status: sharedGroupMemberStatus("status")
            .notNull()
            .default("pending"),

        joinedAt: timestamp("joined_at", {
            withTimezone: true,
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
    (table) => [
        unique("shared_group_members_group_user_unique").on(
            table.groupId,
            table.userId,
        ),
        index("shared_group_members_user_status_idx").on(
            table.userId,
            table.status,
        ),
    ],
);