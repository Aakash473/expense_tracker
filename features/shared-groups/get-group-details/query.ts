import { and, eq } from "drizzle-orm";

import { db } from "@/shared/db";
import { sharedGroupMembers, sharedGroups } from "@/shared/db/tables";

export async function getGroupDetails(groupId: string, userId: string) {
	const [group] = await db
		.select({
			id: sharedGroups.id,
			name: sharedGroups.name,
			description: sharedGroups.description,
		})
		.from(sharedGroups)
		.innerJoin(
			sharedGroupMembers,
			and(
				eq(sharedGroupMembers.groupId, sharedGroups.id),
				eq(sharedGroupMembers.userId, userId),
				eq(sharedGroupMembers.status, "accepted"),
			),
		)
		.where(eq(sharedGroups.id, groupId))
		.limit(1);

	if (!group) {
		return null;
	}

	const members = await db
		.select({
			id: sharedGroupMembers.id,
			userId: sharedGroupMembers.userId,
			role: sharedGroupMembers.role,
			joinedAt: sharedGroupMembers.joinedAt,
		})
		.from(sharedGroupMembers)
		.where(
			and(
				eq(sharedGroupMembers.groupId, groupId),
				eq(sharedGroupMembers.status, "accepted"),
			),
		);

	return {
		...group,
		members,
	};
}
