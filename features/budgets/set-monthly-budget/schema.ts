
import { type } from "arktype";

export const setMonthlyBudgetSchema = type({
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
});

export type SetMonthlyBudgetInput =
    typeof setMonthlyBudgetSchema.inferIn;
