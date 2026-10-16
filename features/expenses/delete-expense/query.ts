import { and, eq } from "drizzle-orm";
import { db } from "@/shared/db";
import { expenses } from "@/shared/db/tables";

export async function deleteUserExpense(userId: string, expenseId: string) {
	return db
		.delete(expenses)
		.where(and(eq(expenses.id, expenseId), eq(expenses.userId, userId)))
		.returning({ id: expenses.id });
}
