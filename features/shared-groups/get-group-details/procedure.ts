import { ORPCError } from "@orpc/server";

import { protectedProcedure } from "@/lib/orpc/procedures";

import { getGroupDetails } from "./query";
import { getGroupDetailsSchema } from "./schema";

export const getGroupDetailsProcedure = protectedProcedure
	.input(getGroupDetailsSchema)
	.handler(async ({ input, context }) => {
		const group = await getGroupDetails(input.groupId, context.user.id);

		if (!group) {
			throw new ORPCError("NOT_FOUND", {
				message: "Group not found",
			});
		}

		return group;
	});
