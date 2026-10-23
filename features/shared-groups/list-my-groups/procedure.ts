import { ORPCError, os } from "@orpc/server";

import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";

import { getMyGroups } from "./query";

export const listMyGroups = os.handler(async () => {
	try {
		const user = await requireUser();
		return await getMyGroups(user.id);
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			throw new ORPCError("UNAUTHORIZED", {
				message: "Unauthorized",
			});
		}

		throw error;
	}
});
