"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import {
    Utensils,
    Plane,
    ShoppingBag,
    FileText,
    MoreHorizontal,
    RefreshCw,
} from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import DeleteExpenseButton from "@/features/expenses/delete-expense/DeleteExpenseButton";
import { Button } from "@/shared/ui/button";
import { useEffect } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { expensesQueryOptions } from "./queries";

const categoryIcons = {
    Food: Utensils,
    Travel: Plane,
    Shopping: ShoppingBag,
    Bills: FileText,
    Other: MoreHorizontal,
};

export default function ExpenseList() {
    const {
        data,
        error,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        refetch,
    } = useQuery(expensesQueryOptions);

    useEffect(() => {
        function handleExpensesChanged() {
            refetch();
        }

        window.addEventListener(
            "expenses:changed",
            handleExpensesChanged
        );

        return () => {
            window.removeEventListener(
                "expenses:changed",
                handleExpensesChanged
            );
        };
    }, [refetch]);

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Activity
                    </p>

                    <CardTitle className="mt-1">
                        Recent Expenses
                    </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                    {data !== undefined && data.length > 0 && (
                        <Badge variant="secondary">
                            {data.length}{" "}
                            {data.length === 1
                                ? "expense"
                                : "expenses"}
                        </Badge>
                    )}

                    <Button
                        type="button"
                        onClick={() => refetch()}
                        variant="outline"
                        size="sm"
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${
                                isFetching ? "animate-spin" : ""
                            }`}
                        />
                        Refresh
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className="space-y-4 py-4">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-3 py-2"
                                >
                                    <Skeleton className="h-10 w-10 rounded-xl" />

                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>

                                    <Skeleton className="h-4 w-20" />
                                </div>
                            )
                        )}
                    </div>
                ) : isError && data === undefined ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-muted/40 px-6 text-center">
                        <p className="font-medium">
                            Failed to load expenses
                        </p>

                        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                            {error?.message}
                        </p>

                        <Button
                            type="button"
                            onClick={() => refetch()}
                            variant="outline"
                            className="mt-4"
                        >
                            Retry
                        </Button>
                    </div>
                ) : data !== undefined &&
                isSuccess &&
                data.length === 0 ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-muted/40 px-6 text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm">
                            ₹
                        </div>

                        <p className="font-medium">
                            No expenses yet
                        </p>

                        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                            Add your first expense to start
                            tracking your spending.
                        </p>
                    </div>
                ) : data !== undefined ? (
                    <>
                        {isError && (
                            <div className="mb-4 flex items-center justify-between rounded-md border px-3 py-2">
                                <p className="text-sm text-muted-foreground">
                                    Couldn&apos;t refresh expenses.
                                </p>

                                <Button
                                    type="button"
                                    onClick={() => refetch()}
                                    variant="ghost"
                                    size="sm"
                                >
                                    Retry
                                </Button>
                            </div>
                        )}

                        <div>
                            <div className="hidden grid-cols-[1fr_120px_100px_40px] items-center gap-4 px-3 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
                                <span>Expense</span>
                                <span>Date</span>
                                <span className="text-right">
                                    Amount
                                </span>
                                <span />
                            </div>

                            <Separator />

                            <div
                                className={
                                    data.length > 5
                                        ? "expense-list-scroll max-h-[360px] overflow-y-auto pr-2"
                                        : ""
                                }
                            >
                                {data.map((expense, index) => (
                                    <div key={expense.id}>
                                        <div className="group grid items-center gap-4 px-3 py-4 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_120px_100px_40px]">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-sm">
                                                    {(() => {
                                                        const Icon =
                                                            categoryIcons[
                                                                expense
                                                                    .category as keyof typeof categoryIcons
                                                                ] ??
                                                            MoreHorizontal;

                                                        return (
                                                            <Icon className="h-5 w-5" />
                                                        );
                                                    })()}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium">
                                                        {expense.description}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {expense.category}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="hidden text-sm text-muted-foreground sm:block">
                                                {expense.date}
                                            </p>

                                            <p className="text-sm font-semibold sm:text-right">
                                                ₹
                                                {expense.amount.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>

                                            <DeleteExpenseButton
                                                expenseId={expense.id}
                                                description={
                                                    expense.description
                                                }
                                            />
                                        </div>

                                        {index < data.length - 1 && (
                                            <Separator />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : null}
            </CardContent>
        </Card>
    );
}