
import { and, eq, gte, lt, sql } from "drizzle-orm";

import { db } from "@/shared/db";
import { expenses, monthlyBudgets } from "@/shared/db/tables";
import { getMonthRange } from "@/shared/date/month-range";

import { toBudgetStatus, type MonthlyBudgetStatus } from "./status";

export async function getMonthlyBudgetStatus(
    userId: string,
    now: Date,
): Promise<MonthlyBudgetStatus> {
    const { month, start, end } = getMonthRange(now);
    const { month: previousMonth } = getMonthRange(
        new Date(start.getTime() - 1),
    );


    const [budgetRows, expenseRows, previousBudgetRows] = await Promise.all([
        db
            .select({ amount: monthlyBudgets.amount })
            .from(monthlyBudgets)
            .where(
                and(
                    eq(monthlyBudgets.userId, userId),
                    eq(monthlyBudgets.month, month),
                ),
            )
            .limit(1),

        db
            .select({
                spent: sql<string>`coalesce(sum(${expenses.amount}), 0)`,
            })
            .from(expenses)
            .where(
                and(
                    eq(expenses.userId, userId),
                    gte(expenses.spentAt, start),
                    lt(expenses.spentAt, end),
                ),
            ),

        db
            .select({ amount: monthlyBudgets.amount })
            .from(monthlyBudgets)
            .where(
                and(
                    eq(monthlyBudgets.userId, userId),
                    eq(monthlyBudgets.month, previousMonth),
                ),
            )
            .limit(1),
    ]);

    const budgetAmount = budgetRows[0]?.amount;
    const spentAmount = expenseRows[0]?.spent ?? "0";

    const previousBudgetAmount = previousBudgetRows[0]?.amount;

    const previousBudget =
        previousBudgetAmount === undefined
            ? null
            : Number(previousBudgetAmount);

    const budget = budgetAmount === undefined
        ? null
        : Number(budgetAmount);

    const spent = Number(spentAmount);

    return toBudgetStatus(month, budget, spent, previousBudget);
}
