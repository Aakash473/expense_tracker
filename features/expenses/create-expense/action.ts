
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

        const { categoryId, amount, description, spentDate, spentTime } =
            validation;

        const [year, month, day] = spentDate.split("-").map(Number);
        const [hours, minutes] = spentTime.split(":").map(Number);

        // Interpret the selected date and time in the server's local timezone.
        const spentAt = new Date(year, month - 1, day, hours, minutes);

        if (
            spentAt.getFullYear() !== year ||
            spentAt.getMonth() !== month - 1 ||
            spentAt.getDate() !== day ||
            spentAt.getHours() !== hours ||
            spentAt.getMinutes() !== minutes
        ) {
            return fail("Enter a valid expense date and time");
        }

        if (spentAt.getTime() > Date.now()) {
            return fail("Expense date and time cannot be in the future");
        }

        const today = new Date();
        const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month - 1 &&
            today.getDate() === day;

        if (!isToday && !input.spentTime) {
            return fail("Choose a time for dates other than today");
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
            spentAt,
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
