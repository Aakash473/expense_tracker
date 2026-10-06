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
import type { Expense } from "./types";
import DeleteExpenseButton from "@/features/expenses/delete-expense/DeleteExpenseButton";
import { useCallback, useEffect, useReducer, useRef } from "react";
type QueryState = {
    status: "pending" | "error" | "success";
    fetchStatus: "fetching" | "idle";
    data: Expense[];
    error: string | null;
};

type QueryAction =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; data: Expense[] }
    | { type: "FETCH_ERROR"; error: string };

function queryReducer(
    state: QueryState,
    action: QueryAction
): QueryState {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                fetchStatus: "fetching",
                error: null,
            };

        case "FETCH_SUCCESS":
            return {
                status: "success",
                fetchStatus: "idle",
                data: action.data,
                error: null,
            };

        case "FETCH_ERROR":
            return {
                ...state,
                status: "error",
                fetchStatus: "idle",
                error: action.error,
            };
    }
}

const categoryIcons = {
    Food: Utensils,
    Travel: Plane,
    Shopping: ShoppingBag,
    Bills: FileText,
    Other: MoreHorizontal,
};

export default function ExpenseList() {
    const [state, dispatch] = useReducer(queryReducer, {
        status: "pending",
        fetchStatus: "idle",
        data: [],
        error: null,
    });

    const requestIdRef = useRef(0);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchExpenses = useCallback(async () => {
        abortControllerRef.current?.abort();

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const requestId = ++requestIdRef.current;

        dispatch({ type: "FETCH_START" });

        try {
            const response = await fetch("/api/expenses", {
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch expenses");
            }

            const data: Expense[] = await response.json();

            if (
                controller.signal.aborted ||
                requestId !== requestIdRef.current
            ) {
                return;
            }

            dispatch({
                type: "FETCH_SUCCESS",
                data,
            });
        } catch (error) {
            if (
                controller.signal.aborted ||
                requestId !== requestIdRef.current
            ) {
                return;
            }

            dispatch({
                type: "FETCH_ERROR",
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            });
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    useEffect(() => {
        function handleFocus() {
            fetchExpenses();
        }

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, [fetchExpenses]);

    useEffect(() => {
        function handleExpensesChanged() {
            fetchExpenses();
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
    }, [fetchExpenses]);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const isLoading =
        state.status === "pending" &&
        state.fetchStatus === "fetching";

    const isFetching = state.fetchStatus === "fetching";

    const isError = state.status === "error";

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
                    {state.data.length > 0 && (
                        <Badge variant="secondary">
                            {state.data.length}{" "}
                            {state.data.length === 1
                                ? "expense"
                                : "expenses"}
                        </Badge>
                    )}

                    <button
                        type="button"
                        onClick={fetchExpenses}
                        disabled={isFetching}
                        className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${
                                isFetching ? "animate-spin" : ""
                            }`}
                        />

                        Refresh
                    </button>
                </div>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className="flex min-h-[260px] items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                            Loading expenses...
                        </p>
                    </div>
                ) : isError && state.data.length === 0 ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-muted/40 px-6 text-center">
                        <p className="font-medium">
                            Failed to load expenses
                        </p>

                        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                            {state.error}
                        </p>
                    </div>
                ) : state.data.length === 0 ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-muted/40 px-6 text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm">
                            ₹
                        </div>

                        <p className="font-medium">
                            No expenses yet
                        </p>

                        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                            Add your first expense to start tracking your spending.
                        </p>
                    </div>
                ) : (
                    <div>
                        <div className="hidden grid-cols-[1fr_120px_100px_40px] items-center gap-4 px-3 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
                            <span>Expense</span>
                            <span>Date</span>
                            <span className="text-right">Amount</span>
                            <span />
                        </div>

                        <Separator />

                        <div>
                            {state.data.map((expense, index) => (
                                <div key={expense.id}>
                                    <div className="group grid items-center gap-4 px-3 py-4 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_120px_100px_40px]">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-sm">
                                                {(() => {
                                                    const Icon =
                                                        categoryIcons[
                                                            expense.category as keyof typeof categoryIcons
                                                            ] ?? MoreHorizontal;

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
                                            {expense.amount.toLocaleString("en-IN")}
                                        </p>

                                        <DeleteExpenseButton
                                            expenseId={expense.id}
                                            description={expense.description}
                                        />
                                    </div>

                                    {index < state.data.length - 1 && <Separator />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}