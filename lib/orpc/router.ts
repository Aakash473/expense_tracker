import { listExpenses } from "@/features/expenses/list-expenses/procedure";
import { createExpense } from "@/features/expenses/create-expense/procedure";
import { deleteExpense } from "@/features/expenses/delete-expense/procedure";
import { setMonthlyBudget } from "@/features/budgets/set-monthly-budget/procedure";

export const router = {
    expenses: {
        list: listExpenses,
        create: createExpense,
        delete: deleteExpense,
    },
    budgets: {
        setMonthly: setMonthlyBudget,
    },
};