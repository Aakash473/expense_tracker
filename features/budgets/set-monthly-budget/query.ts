import { db } from "@/shared/db";
import { monthlyBudgets } from "@/shared/db/tables";

type UpsertMonthlyBudgetInput = {
	userId: string;
	month: string;
	amount: string;
};

export async function upsertMonthlyBudget(input: UpsertMonthlyBudgetInput) {
	const result = await db
		.insert(monthlyBudgets)
		.values(input)
		.onConflictDoUpdate({
			target: [monthlyBudgets.userId, monthlyBudgets.month],
			set: { amount: input.amount },
		})
		.returning();

	return result[0];
}
