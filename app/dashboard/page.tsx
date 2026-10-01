import DashboardHeader from "@/components/DashboardHeader";

import CreateExpenseForm from "@/features/expenses/create-expense/CreateExpenseForm";
import ExpenseList from "@/features/expenses/list-expenses/ExpenseList";
import type { Expense } from "@/features/expenses/list-expenses/types";

import SpendingSummary from "@/features/expenses/spending-summary/SpendingSummary";
import CategorySpending from "@/features/expenses/spending-summary/CategorySpending";

import { getExpenses } from "@/features/expenses/list-expenses/query";
import { getCategories } from "@/features/categories/list-categories/query";
import { requireUser } from "@/shared/auth/requireUser";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const user = await requireUser();

    const [expenseRows, categories] = await Promise.all([
        getExpenses(user.id),
        getCategories(),
    ]);

    const expenses: Expense[] = expenseRows.map((expense) => ({
        id: expense.id,
        category: expense.category,
        description: expense.description ?? "",
        amount: Number(expense.amount),
        date: expense.createdAt.toISOString().split("T")[0],
    }));

    const totalSpending = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <DashboardHeader />

                <div className="mt-10 grid grid-cols-12 gap-6">
                    {/* Total Spending */}
                    <div className="col-span-12 lg:col-span-4">
                        <SpendingSummary totalSpending={totalSpending} />
                    </div>

                    {/* Add Expense */}
                    <div className="col-span-12 lg:col-span-8">
                        <CreateExpenseForm categories={categories} />
                    </div>

                    {/* Recent Expenses */}
                    <div className="col-span-12 lg:col-span-8">
                        <ExpenseList expenses={expenses} />
                    </div>

                    {/* Category Statistics */}
                    <div className="col-span-12 lg:col-span-4">
                        <CategorySpending expenses={expenses} />
                    </div>
                </div>
            </div>
        </main>
    );
}