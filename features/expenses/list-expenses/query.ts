
import { db } from "@/shared/db";
import { categories, expenses } from "@/shared/db/schema";
import { eq } from "drizzle-orm";

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
