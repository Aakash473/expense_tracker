import { and, eq } from "drizzle-orm";

import { db } from "@/shared/db";
import { sharedGroupMembers, sharedGroups } from "@/shared/db/tables";
import { supabaseAdmin } from "@/shared/supabase/admin";

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

	const membersWithEmails = await Promise.all(
		members.map(async (member) => {
			const memberUserId = member.userId;

			if (!memberUserId) {
				return {
					...member,
					email: null,
				};
			}

			const { data, error } =
				await supabaseAdmin.auth.admin.getUserById(memberUserId);

			if (error) {
				throw error;
			}

			return {
				...member,
				email: data.user?.email ?? null,
			};
		}),
	);

	return {
		...group,
		members: membersWithEmails,
	};
}
