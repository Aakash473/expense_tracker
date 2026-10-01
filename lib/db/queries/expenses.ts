import { db } from "@/lib/db";
import { categories, expenses } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function getExpenses(userId: string) {
    return db
        .select({
            id: expenses.id,
            category: categories.name,
            description: expenses.description,
            amount: expenses.amount,
            createdAt: expenses.createdAt,
        })
        .from(expenses)
        .innerJoin(
            categories,
            eq(expenses.categoryId, categories.id)
        )
        .where(eq(expenses.userId, userId))
        .orderBy(expenses.createdAt);
}

type InsertExpenseInput = {
    userId: string;
    categoryId: string;
    amount: string;
    description: string | null;
};

export async function insertExpense(input: InsertExpenseInput) {
    const result = await db
        .insert(expenses)
        .values(input)
        .returning();

    return result[0];
}

export async function deleteUserExpense(
    userId: string,
    expenseId: string
) {
    return db
        .delete(expenses)
        .where(
            and(
                eq(expenses.id, expenseId),
                eq(expenses.userId, userId)
            )
        )
        .returning({ id: expenses.id });
}