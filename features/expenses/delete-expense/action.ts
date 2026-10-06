
"use server";

import { deleteExpenseSchema } from "./schema";
import { deleteUserExpense } from "./query";
import { fail, ok, type ActionResult } from "@/shared/result";
import { requireUser } from "@/shared/auth/requireUser";
import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import { type } from "arktype";

export async function deleteExpense(
    expenseId: string
): Promise<ActionResult<{ id: string }>> {
    const validation = deleteExpenseSchema({ expenseId });

    if (validation instanceof type.errors) {
        return fail(validation.summary);
    }

    try {
        const user = await requireUser();

        const deleted = await deleteUserExpense(
            user.id,
            validation.expenseId
        );

        if (deleted.length === 0) {
            return fail("Expense not found");
        }

        revalidatePath("/dashboard");

        return ok(deleted[0]);
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return fail("Unauthorized");
        }

        throw error;
    }
}
