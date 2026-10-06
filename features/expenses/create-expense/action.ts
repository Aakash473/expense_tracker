
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
): Promise<ActionResult<Awaited<ReturnType<typeof insertExpense>>>> {
    const validation = createExpenseSchema(input);

    if (validation instanceof type.errors) {
        return fail(validation[0].message);
    }

    try {
        const user = await requireUser();

        const { categoryId, amount, description } = validation;

        const exists = await categoryExists(categoryId);

        if (!exists) {
            return fail("Category does not exist");
        }

        const expense = await insertExpense({
            userId: user.id,
            categoryId,
            amount: amount.toString(),
            description,
        });

        revalidatePath("/dashboard");

        return ok(expense);
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return fail("Unauthorized");
        }

        throw error;
    }
}
