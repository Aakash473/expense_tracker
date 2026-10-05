
import { z } from "zod";

export const createExpenseSchema = z.object({
    amount: z
        .number()
        .positive("Amount must be greater than 0")
        .max(
            9_999_999_999.99,
            "Amount cannot exceed 9,999,999,999.99"
        )
        .refine(
            (value) =>
                Math.abs(Math.round(value * 100) - value * 100) < 1e-8,
            "Amount can have at most 2 decimal places"
        ),

    categoryId: z.uuid("Category must be a valid UUID"),

    description: z
        .string()
        .trim()
        .min(1, "Description is required")
        .max(
            200,
            "Description must be 200 characters or less"
        ),
});

export type CreateExpenseInput = z.input<typeof createExpenseSchema>;
