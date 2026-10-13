
"use client";

import type { BudgetStatus, MonthlyBudgetStatus } from "./status";

type MonthlyBudgetCardProps = {
    budgetStatus: MonthlyBudgetStatus;
};

const statusLabels: Record<BudgetStatus, string> = {
    unset: "No budget",
    ok: "On track",
    warning: "Almost there",
    over: "Over budget",
};

const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export default function MonthlyBudgetCard({
                                              budgetStatus,
                                          }: MonthlyBudgetCardProps) {
    const monthTitle = new Intl.DateTimeFormat("en-IN", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${budgetStatus.month}T00:00:00Z`));

    const { budget, spent, remaining, percent, status } = budgetStatus;

    const progressClass = {
        unset: "",
        ok: "",
        warning: "[&_[data-slot=progress-indicator]]:bg-amber-500",
        over: "[&_[data-slot=progress-indicator]]:bg-destructive",
    }[status];

    return (
        <div className="rounded-xl border p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{monthTitle}</h2>
                <span className="rounded-full border px-3 py-1 text-sm">
                    {statusLabels[status]}
                </span>
            </div>

            <p className="text-2xl font-bold">
                {status === "unset" && `${money(spent)} spent`}
                {status === "ok" && `${money(remaining!)} left`}
                {status === "warning" && `${money(remaining!)} left`}
                {status === "over" && `${money(Math.abs(remaining!))} over budget`}
            </p>

            {status === "unset" ? (
                <p className="mt-3 text-sm text-muted-foreground">
                    Set a monthly budget to track what&apos;s left.
                </p>
            ) : (
                <>
                    <div className="mt-4">
                        <div
                            className={`h-2 overflow-hidden rounded-full bg-muted ${progressClass}`}
                        >
                            <div
                                className={`h-full rounded-full ${
                                    status === "warning"
                                        ? "bg-amber-500"
                                        : status === "over"
                                            ? "bg-destructive"
                                            : "bg-primary"
                                }`}
                                style={{
                                    width: `${Math.min(percent!, 100)}%`,
                                }}
                            />
                        </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                        {money(spent)} of {money(budget!)} · {percent}%
                    </p>
                </>
            )}
        </div>
    );
}
