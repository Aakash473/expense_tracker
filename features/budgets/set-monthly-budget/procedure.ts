import { ORPCError, os } from "@orpc/server";

import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import { getMonthRange } from "@/shared/date/month-range";

import { upsertMonthlyBudget } from "./query";
import { setMonthlyBudgetSchema } from "./schema";

export const setMonthlyBudget = os
	.input(setMonthlyBudgetSchema)
	.handler(async ({ input }) => {
		try {
			const user = await requireUser();
			const { month } = getMonthRange(new Date());

			return await upsertMonthlyBudget({
				userId: user.id,
				month,
				amount: input.amount.toString(),
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
