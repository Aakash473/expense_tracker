import { ORPCError } from "@orpc/server";

import { protectedProcedure } from "@/lib/orpc/procedures";

import { categoryExists, insertExpense } from "./query";
import { createExpenseSchema } from "./schema";

export const createExpense = protectedProcedure
	.input(createExpenseSchema)
	.handler(async ({ input, context }) => {
		const { categoryId, amount, description, spentAt } = input;

		const exists = await categoryExists(categoryId);

		if (!exists) {
			throw new ORPCError("NOT_FOUND", {
				message: "Category does not exist",
			});
		}

		return await insertExpense({
			userId: context.user.id,
			categoryId,
			amount: amount.toString(),
			description,
			spentAt: new Date(spentAt),
		});
	});
