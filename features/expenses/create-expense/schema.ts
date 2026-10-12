
import { type } from "arktype";

export const createExpenseSchema = type({
    amount: type("number > 0")
        .configure({
            message: "Amount must be greater than 0",
        })
        .and(
            type("number <= 9999999999.99").configure({
                message: "Amount cannot exceed 9,999,999,999.99",
            })
        )
        .narrow(
            (value, ctx) =>
                Math.abs(Math.round(value * 100) - value * 100) < 1e-8 ||
                ctx.reject({
                    message: "Amount can have at most 2 decimal places",
                })
        ),

    categoryId: type("string.uuid").configure({
        message: "Category must be a valid UUID",
    }),

    description: type("string")
        .pipe((value) => value.trim())
        .pipe(
            type("1 <= string <= 200").configure({
                message: "Description must be 1–200 characters",
            })
        ),

    spentAt: type("string").narrow(
        (value, ctx) =>
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) &&
            Number.isFinite(Date.parse(value)) ||
            ctx.reject({
                message: "Enter a valid expense date and time",
            })
    ),
});

export type CreateExpenseInput = typeof createExpenseSchema.inferIn;
