import { ORPCError, os } from "@orpc/server";

import { createExpenseSchema } from "./schema";
import { categoryExists, insertExpense } from "./query";
import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";

export const createExpense = os
    .input(createExpenseSchema)
    .handler(async ({ input }) => {
        try {
            const user = await requireUser();

            const { categoryId, amount, description, spentAt } = input;
            const spentAtDate = new Date(spentAt);

            const exists = await categoryExists(categoryId);

            if (!exists) {
                throw new ORPCError("NOT_FOUND", {
                    message: "Category does not exist",
                });
            }

            return await insertExpense({
                userId: user.id,
                categoryId,
                amount: amount.toString(),
                description,
                spentAt: spentAtDate,
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
