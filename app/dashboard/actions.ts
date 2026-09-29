"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { expenses } from "@/lib/db/schema";
import { getExpenses } from "@/lib/db/queries/expenses";

type CreateExpenseInput = {
    categoryId: string;
    amount: number;
    description?: string;
};

export async function createExpense({
                                        categoryId,
                                        amount,
                                        description,
                                    }: CreateExpenseInput) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
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

    return result[0];
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