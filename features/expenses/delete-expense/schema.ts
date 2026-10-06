import { type } from "arktype";

export const deleteExpenseSchema = type({
    expenseId: "string.uuid",
});

export type DeleteExpenseInput = typeof deleteExpenseSchema.infer;