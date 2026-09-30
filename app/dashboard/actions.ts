"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { categories, expenses } from "@/lib/db/schema";
import { getExpenses } from "@/lib/db/queries/expenses";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const createExpenseSchema = z.object({
    amount: z
        .number()
        .positive("Amount must be greater than 0")
        .refine(
            (value) => Number.isInteger(value * 100),
            "Amount can have at most 2 decimal places"
        ),

    categoryId: z.uuid("Category must be a valid UUID"),

    description: z
        .string()
        .trim()
        .min(1, "Description is required")
        .max(200, "Description must be 200 characters or less"),
});

const deleteExpenseSchema = z.object({
    expenseId: z.uuid("Expense ID must be a valid UUID"),
});

type CreateExpenseInput = {
    categoryId: string;
    amount: number;
    description?: string;
};

export async function createExpense(input: CreateExpenseInput) {
    const validation = createExpenseSchema.safeParse(input);

    if (!validation.success) {
        return {
            ok: false as const,
            error: validation.error.issues[0].message,
        };
    }

    const { categoryId, amount, description } = validation.data;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            ok: false as const,
            error: "Unauthorized",
        };
    }

    const category = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.id, categoryId))
        .limit(1);

    if (category.length === 0) {
        return {
            ok: false as const,
            error: "Category does not exist",
        };
    }

    const result = await db
        .insert(expenses)
        .values({
            userId: user.id,
            categoryId,
            amount: amount.toString(),
            description: description || null,
        })
        .returning();

    return {
        ok: true as const,
        data: result[0],
    };
}

export async function getUserExpenses() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    return getExpenses(user.id);
}

export async function deleteExpense(expenseId: string) {
    const validation = deleteExpenseSchema.safeParse({
        expenseId,
    });

    if (!validation.success) {
        return {
            ok: false as const,
            error: validation.error.issues[0].message,
        };
    }
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            ok: false as const,
            error: "Unauthorized",
        };
    }
    await db
        .delete(expenses)
        .where(
            and(
                eq(expenses.id, expenseId),
                eq(expenses.userId, user.id)
            )
        );

    return {
        ok: true as const,
        data: null,
    };
}