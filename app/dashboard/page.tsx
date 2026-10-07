import { redirect } from "next/navigation";

import DashboardHeader from "@/shared/layout/DashboardHeader";

import CreateExpenseForm from "@/features/expenses/create-expense/CreateExpenseForm";
import ExpenseList from "@/features/expenses/list-expenses/ExpenseList";
import { getExpenseSummary } from "@/features/expenses/list-expenses/query";

import SpendingSummary from "@/features/expenses/spending-summary/SpendingSummary";
import CategorySpending from "@/features/expenses/spending-summary/CategorySpending";

import { getCategories } from "@/features/categories/list-categories/query";
import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    let user;

    try {
        user = await requireUser();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            redirect("/login");
        }

        throw error;
    }

    const [expenseSummary, categories] = await Promise.all([
        getExpenseSummary(user.id),
        getCategories(),
    ]);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <DashboardHeader />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Total Spending */}
                    <div className="col-span-12 lg:col-span-4">
                        <SpendingSummary
                            totalSpending={expenseSummary.totalSpending}
                        />
                    </div>

                    {/* Add Expense */}
                    <div className="col-span-12 lg:col-span-8">
                        <CreateExpenseForm categories={categories} />
                    </div>

                    {/* Recent Expenses */}
                    <div className="col-span-12 lg:col-span-8">
                        <ExpenseList />
                    </div>

                    {/* Category Statistics */}
                    <div className="col-span-12 lg:col-span-4">
                        <CategorySpending
                            expenses={expenseSummary.expenses}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}