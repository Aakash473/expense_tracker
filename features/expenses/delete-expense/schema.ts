
import { z } from "zod";

export const deleteExpenseSchema = z.object({
    expenseId: z.uuid("Expense ID must be a valid UUID"),
});

export type DeleteExpenseInput = z.input<typeof deleteExpenseSchema>;
