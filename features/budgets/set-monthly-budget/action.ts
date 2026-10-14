
"use server";

import { type } from "arktype";
import { revalidatePath } from "next/cache";

import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import { getMonthRange } from "@/shared/date/month-range";
import { fail, ok, type ActionResult } from "@/shared/result";

import { upsertMonthlyBudget } from "./query";
import {
    setMonthlyBudgetSchema,
    type SetMonthlyBudgetInput,
} from "./schema";

export async function setMonthlyBudget(
    input: SetMonthlyBudgetInput,
): Promise<
    ActionResult<Awaited<ReturnType<typeof upsertMonthlyBudget>>>
> {
    const validation = setMonthlyBudgetSchema(input);

    if (validation instanceof type.errors) {
        return fail(validation[0].message);
    }

    try {
        const user = await requireUser();
        const { month } = getMonthRange(new Date());

        const budget = await upsertMonthlyBudget({
            userId: user.id,
            month,
            amount: validation.amount.toString(),
        });

        revalidatePath("/personal");

        return ok(budget);
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return fail("Unauthorized");
        }

        throw error;
    }
}
