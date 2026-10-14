import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Progress } from "@/shared/ui/progress";
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
        <Card className="h-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <CardTitle>{monthTitle}</CardTitle>
                <Badge>{statusLabels[status]}</Badge>
            </CardHeader>

            <CardContent>
                <p className="text-2xl font-bold">
                    {status === "unset" && `${money(spent)} spent`}
                    {(status === "ok" || status === "warning") &&
                        `${money(remaining!)} left`}
                    {status === "over" &&
                        `${money(Math.abs(remaining!))} over budget`}
                </p>

                {status === "unset" ? (
                    <p className="mt-3 text-sm text-muted-foreground">
                        Set a monthly budget to track what&apos;s left.
                    </p>
                ) : (
                    <>
                        <Progress
                            value={Math.min(percent!, 100)}
                            className={`mt-4 ${progressClass}`}
                        />
                        <p className="mt-3 text-sm text-muted-foreground">
                            {money(spent)} of {money(budget!)} · {percent}%
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
