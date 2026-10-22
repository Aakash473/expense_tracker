import { db } from "@/shared/db";
import { sharedGroupMembers, sharedGroups } from "@/shared/db/tables";

type CreateGroupQueryInput = {
	userId: string;
	name: string;
	description?: string;
};

export async function createGroupQuery(input: CreateGroupQueryInput) {
	return db.transaction(async (tx) => {
		const [group] = await tx
			.insert(sharedGroups)
			.values({
				name: input.name.trim(),
				description: input.description?.trim() || null,
				createdBy: input.userId,
			})
			.returning();

		await tx.insert(sharedGroupMembers).values({
			groupId: group.id,
			userId: input.userId,
			role: "owner",
			status: "accepted",
			joinedAt: new Date(),
		});

		return group;
	});
}
