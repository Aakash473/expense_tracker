
export type BudgetStatus = "unset" | "ok" | "warning" | "over";

export type MonthlyBudgetStatus = {
    month: string;
    budget: number | null;
    spent: number;
    remaining: number | null;
    percent: number | null;
    status: BudgetStatus;
};

export function toBudgetStatus(
    month: string,
    budget: number | null,
    spent: number,
): MonthlyBudgetStatus {
    if (budget === null) {
        return {
            month,
            budget: null,
            spent,
            remaining: null,
            percent: null,
            status: "unset",
        };
    }

    const remaining = budget - spent;
    const percent = Math.round((spent / budget) * 100);

    let status: BudgetStatus = "ok";

    if (spent > budget) {
        status = "over";
    } else if (spent >= budget * 0.8) {
        status = "warning";
    }

    return {
        month,
        budget,
        spent,
        remaining,
        percent,
        status,
    };
}
