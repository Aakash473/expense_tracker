import { protectedProcedure } from "@/lib/orpc/procedures";

import { getMyGroups } from "./query";

export const listMyGroups = protectedProcedure.handler(async ({ context }) => {
	return await getMyGroups(context.user.id);
});
