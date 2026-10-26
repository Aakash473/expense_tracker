import { protectedProcedure } from "@/lib/orpc/procedures";
import { getExpenseSummary } from "./query";

export const listExpenses = protectedProcedure.handler(async ({ context }) => {
	const summary = await getExpenseSummary(context.user.id);

	return summary.expenses;
});
