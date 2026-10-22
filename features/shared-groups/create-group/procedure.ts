import { ORPCError, os } from "@orpc/server";

import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";

import { createGroupQuery } from "./query";
import { createGroupSchema } from "./schema";

export const createGroup = os
	.input(createGroupSchema)
	.handler(async ({ input }) => {
		try {
			const user = await requireUser();

			return await createGroupQuery({
				userId: user.id,
				name: input.name,
				description: input.description,
			});
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				throw new ORPCError("UNAUTHORIZED", {
					message: "Unauthorized",
				});
			}

			throw error;
		}
	});
