import { protectedProcedure } from "@/lib/orpc/procedures";

import { createGroupQuery } from "./query";
import { createGroupSchema } from "./schema";

export const createGroup = protectedProcedure
	.input(createGroupSchema)
	.handler(async ({ input, context }) => {
		return await createGroupQuery({
			userId: context.user.id,
			name: input.name,
			description: input.description,
		});
	});
