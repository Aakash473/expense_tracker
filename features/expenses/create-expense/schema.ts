import { type } from "arktype";

export const createExpenseSchema = type({
    amount: type("number > 0 & number <= 9999999999.99").narrow(
        (value) => Math.abs(Math.round(value * 100) - value * 100) < 1e-8
    ),
    categoryId: "string.uuid",
    description: type("string")
        .pipe((value) => value.trim())
        .pipe(type("string >= 1 & string <= 200")),
});

export type CreateExpenseInput = typeof createExpenseSchema.infer;