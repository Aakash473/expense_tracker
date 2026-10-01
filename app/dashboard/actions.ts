"use server";

import {
    createExpenseSchema,
    deleteExpenseSchema,
    type CreateExpenseInput,
} from "@/lib/validations/expense";
import {
    categoryExists,
} from "@/lib/db/queries/categories";
import {
    getExpenses,
    insertExpense,
    deleteUserExpense,
} from "@/lib/db/queries/expenses";
import {
    fail,
    ok,
    type ActionResult,
} from "@/lib/types/action-result";
import { getCurrentUser } from "@/lib/supabase/auth";

export async function createExpense(
    input: CreateExpenseInput
): Promise<ActionResult<Awaited<ReturnType<typeof insertExpense>>>> {
    const validation = createExpenseSchema.safeParse(input);

    if (!validation.success) {
        return fail(validation.error.issues[0].message);
    }

    const user = await getCurrentUser();

    if (!user) {
        return fail("Unauthorized");
    }

    const {
        categoryId,
        amount,
        description,
    } = validation.data;

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

    return ok(expense);
}

export async function getUserExpenses(): Promise<
    ActionResult<Awaited<ReturnType<typeof getExpenses>>>
> {
    const user = await getCurrentUser();

    if (!user) {
        return fail("Unauthorized");
    }

    const expenses = await getExpenses(user.id);

    return ok(expenses);
}

export async function deleteExpense(
    expenseId: string
): Promise<ActionResult<{ id: string }>> {
    const validation = deleteExpenseSchema.safeParse({
        expenseId,
    });

    if (!validation.success) {
        return fail(validation.error.issues[0].message);
    }

    const user = await getCurrentUser();

    if (!user) {
        return fail("Unauthorized");
    }

    const deleted = await deleteUserExpense(
        user.id,
        validation.data.expenseId
    );

    if (deleted.length === 0) {
        return fail("Expense not found");
    }

    return ok(deleted[0]);
}