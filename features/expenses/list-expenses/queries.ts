import { queryOptions } from "@tanstack/react-query";
import type { Expense } from "./types";

const fetchExpenses = async ({
                                 signal,
                             }: {
    signal: AbortSignal;
}) => {
    const response = await fetch("/api/expenses", {
        signal,
    });

    if (response.redirected) {
        throw new Error(
            "Your session has expired. Please log in again."
        );
    }

    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }

    return (await response.json()) as Expense[];
};

export const expensesQueryOptions = queryOptions({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
});