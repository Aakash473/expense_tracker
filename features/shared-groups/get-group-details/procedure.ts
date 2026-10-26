import { ORPCError, os } from "@orpc/server";

import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import { getGroupDetails } from "./query";
import { getGroupDetailsSchema } from "./schema";

export const getGroupDetailsProcedure = os
	.input(getGroupDetailsSchema)
	.handler(async ({ input }) => {
		let user;

		try {
			user = await requireUser();
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				throw new ORPCError("UNAUTHORIZED", {
					message: "Unauthorized",
				});
			}

			throw error;
		}

		const group = await getGroupDetails(input.groupId, user.id);

		if (!group) {
			throw new ORPCError("NOT_FOUND", {
				message: "Group not found",
			});
		}

		return group;
	});
