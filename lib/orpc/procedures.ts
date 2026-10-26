import { ORPCError, os } from "@orpc/server";

import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";

export const protectedProcedure = os.use(async ({ next }) => {
	try {
		const user = await requireUser();

		return next({
			context: {
				user,
			},
		});
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			throw new ORPCError("UNAUTHORIZED");
		}

		throw error;
	}
});
