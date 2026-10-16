import { ORPCError, os } from "@orpc/server";
import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import { deleteUserExpense } from "./query";
import { deleteExpenseSchema } from "./schema";

export const deleteExpense = os
	.input(deleteExpenseSchema)
	.handler(async ({ input }) => {
		try {
			const user = await requireUser();

			const deleted = await deleteUserExpense(user.id, input.expenseId);

			if (deleted.length === 0) {
				throw new ORPCError("NOT_FOUND", {
					message: "Expense not found",
				});
			}

			return deleted[0];
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				throw new ORPCError("UNAUTHORIZED", {
					message: "Unauthorized",
				});
			}

			throw error;
		}
	});
