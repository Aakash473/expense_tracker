
import { db } from "@/shared/db";
import { categories, expenses } from "@/shared/db/tables";
import { eq } from "drizzle-orm";

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

export async function categoryExists(categoryId: string) {
    const result = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.id, categoryId))
        .limit(1);

    return result.length > 0;
}
