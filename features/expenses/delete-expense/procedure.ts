import { ORPCError } from "@orpc/server";

import { protectedProcedure } from "@/lib/orpc/procedures";

import { deleteUserExpense } from "./query";
import { deleteExpenseSchema } from "./schema";

export const deleteExpense = protectedProcedure
	.input(deleteExpenseSchema)
	.handler(async ({ input, context }) => {
		const deleted = await deleteUserExpense(context.user.id, input.expenseId);

		if (deleted.length === 0) {
			throw new ORPCError("NOT_FOUND", {
				message: "Expense not found",
			});
		}

		return deleted[0];
	});
