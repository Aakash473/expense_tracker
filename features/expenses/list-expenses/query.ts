
import { db } from "@/shared/db";
import { categories, expenses } from "@/shared/db/tables";
import { eq } from "drizzle-orm";
import type { Expense } from "./types";
import { desc} from "drizzle-orm";

export async function getExpenses(userId: string) {
    return db
        .select({
            id: expenses.id,
            category: categories.name,
            description: expenses.description,
            amount: expenses.amount,
            spentAt: expenses.spentAt,
        })
        .from(expenses)
        .innerJoin(
            categories,
            eq(expenses.categoryId, categories.id)
        )
        .where(eq(expenses.userId, userId))
        .orderBy(desc(expenses.spentAt))
}

export async function getExpenseSummary(userId: string) {
    const rows = await getExpenses(userId);

    const expenses: Expense[] = rows.map((expense) => {

        return {
            id: expense.id,
            category: expense.category,
            description: expense.description ?? "",
            amount: Number(expense.amount),
            spentAt: expense.spentAt.toISOString()
        };
    });

    const totalSpending = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    return {
        expenses,
        totalSpending,
    };
}
