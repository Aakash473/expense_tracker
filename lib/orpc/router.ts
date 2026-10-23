import { setMonthlyBudget } from "@/features/budgets/set-monthly-budget/procedure";
import { createExpense } from "@/features/expenses/create-expense/procedure";
import { deleteExpense } from "@/features/expenses/delete-expense/procedure";
import { listExpenses } from "@/features/expenses/list-expenses/procedure";
import { createGroup } from "@/features/shared-groups/create-group/procedure";
import { listMyGroups } from "@/features/shared-groups/list-my-groups/procedure";

export const router = {
	expenses: {
		list: listExpenses,
		create: createExpense,
		delete: deleteExpense,
	},
	budgets: {
		setMonthly: setMonthlyBudget,
	},
	sharedGroups: {
		create: createGroup,
		listMy: listMyGroups,
	},
};
