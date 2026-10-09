
import { type } from "arktype";


const isValidDate = (value: string) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (!match) return false;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const date = new Date(Date.UTC(year, month - 1, day));

    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
};


const isValidTime = (value: string) =>
    /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);

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

    spentDate: type("string")
        .narrow(
            (value, ctx) =>
                isValidDate(value) ||
                ctx.reject({ message: "Enter a valid expense date" })
        ),

    spentTime: type("string")
        .narrow(
            (value, ctx) =>
                isValidTime(value) ||
                ctx.reject({ message: "Enter a valid time" })
        ),
});

export type CreateExpenseInput = typeof createExpenseSchema.inferIn;
