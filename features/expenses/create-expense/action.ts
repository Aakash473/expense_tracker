
"use server";

import {
    createExpenseSchema,
    type CreateExpenseInput,
} from "./schema";
import { categoryExists, insertExpense } from "./query";
import { fail, ok, type ActionResult } from "@/shared/result";
import { requireUser } from "@/shared/auth/requireUser";
import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import { type } from "arktype";

export async function createExpense(
    input: CreateExpenseInput
): Promise<
    ActionResult<Awaited<ReturnType<typeof insertExpense>>>
> {
    const validation = createExpenseSchema(input);

    if (validation instanceof type.errors) {
        return fail(validation[0].message);
    }

    try {
        const user = await requireUser();

        const { categoryId, amount, description, spentAt } = validation;

        // Parse the ISO timestamp supplied by the browser.
        const spentAtDate = new Date(spentAt);

        if (!Number.isFinite(spentAtDate.getTime())) {
            return fail("Enter a valid expense date and time");
        }

        // Validate on the server; client-side checks alone are not sufficient.
        if (spentAtDate.getTime() > Date.now()) {
            return fail(
                "Expense date and time cannot be in the future"
            );
        }

        const exists = await categoryExists(categoryId);

        if (!exists) {
            return fail("Category does not exist");
        }

        const expense = await insertExpense({
            userId: user.id,
            categoryId,
            amount: amount.toString(),
            description,
            spentAt: spentAtDate,
        });

        revalidatePath("/personal");

        return ok(expense);
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return fail("Unauthorized");
        }

        throw error;
    }
}
