import { and, count, eq, sql } from "drizzle-orm";

import { db } from "@/shared/db";
import { sharedGroupMembers, sharedGroups } from "@/shared/db/tables";

export async function getMyGroups(userId: string) {
	const acceptedMembers = db
		.select({
			groupId: sharedGroupMembers.groupId,
			memberCount: count().as("member_count"),
		})
		.from(sharedGroupMembers)
		.where(eq(sharedGroupMembers.status, "accepted"))
		.groupBy(sharedGroupMembers.groupId)
		.as("accepted_members");

	return db
		.select({
			id: sharedGroups.id,
			name: sharedGroups.name,
			description: sharedGroups.description,
			role: sharedGroupMembers.role,
			acceptedMemberCount: acceptedMembers.memberCount,
			createdAt: sharedGroups.createdAt,
		})
		.from(sharedGroupMembers)
		.innerJoin(sharedGroups, eq(sharedGroupMembers.groupId, sharedGroups.id))
		.innerJoin(acceptedMembers, eq(acceptedMembers.groupId, sharedGroups.id))
		.where(
			and(
				eq(sharedGroupMembers.userId, userId),
				eq(sharedGroupMembers.status, "accepted"),
			),
		)
		.orderBy(sql`${sharedGroups.createdAt} DESC`);
}
