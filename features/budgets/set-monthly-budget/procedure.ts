import { protectedProcedure } from "@/lib/orpc/procedures";

import { getMonthRange } from "@/shared/date/month-range";

import { upsertMonthlyBudget } from "./query";
import { setMonthlyBudgetSchema } from "./schema";

export const setMonthlyBudget = protectedProcedure
	.input(setMonthlyBudgetSchema)
	.handler(async ({ input, context }) => {
		const { month } = getMonthRange(new Date());

		return await upsertMonthlyBudget({
			userId: context.user.id,
			month,
			amount: input.amount.toString(),
		});
	});
