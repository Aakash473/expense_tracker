import { type } from "arktype";

export const deleteExpenseSchema = type({
    expenseId: type("string.uuid").configure({
        message: "Expense ID must be a valid UUID",
    }),
});

export type DeleteExpenseInput =
    typeof deleteExpenseSchema.inferIn;