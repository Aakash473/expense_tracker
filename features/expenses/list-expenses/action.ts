
"use server";

import { getExpenses } from "./query";
import { fail, ok, type ActionResult } from "@/shared/result";
import { requireUser } from "@/shared/auth/requireUser";

export async function getUserExpenses(): Promise<
    ActionResult<Awaited<ReturnType<typeof getExpenses>>>
> {
    try {
        const user = await requireUser();
        const expenses = await getExpenses(user.id);

        return ok(expenses);
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return fail("Unauthorized");
        }

        throw error;
    }
}
