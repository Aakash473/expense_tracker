import { redirect } from "next/navigation";

import ExpenseList from "@/features/expenses/list-expenses/ExpenseList";
import { getExpenseSummary } from "@/features/expenses/list-expenses/query";

import SpendingSummary from "@/features/expenses/spending-summary/SpendingSummary";
import CategorySpending from "@/features/expenses/spending-summary/CategorySpending";

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

    const expenseSummary = await getExpenseSummary(user.id);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid min-w-0 grid-cols-12 gap-6">
                {/* Total Spending */}
                <div className="col-span-12 lg:col-span-4">
                    <SpendingSummary
                        totalSpending={expenseSummary.totalSpending}
                    />
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
    );
}