
import { ORPCError, os } from "@orpc/server";

import { getExpenseSummary } from "./query";
import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";

export const listExpenses = os.handler(async () => {
    let user;

    try {
        user = await requireUser();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            throw new ORPCError("UNAUTHORIZED");
        }

        throw error;
    }
    const summary = await getExpenseSummary(user.id);
    return summary.expenses;
});
