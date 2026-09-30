import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import type { Expense } from "@/lib/types/expense";

type ExpenseListProps = {
    expenses: Expense[];
    onDelete: (id: string) => void;
};

const categoryIcons: Record<string, string> = {
    Food: "🍔",
    Travel: "✈️",
    Shopping: "🛍️",
    Bills: "📄",
    Other: "•••",
};

export default function ExpenseList({
                                        expenses,
                                        onDelete,
                                    }: ExpenseListProps) {
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

                {expenses.length > 0 && (
                    <Badge variant="secondary">
                        {expenses.length}{" "}
                        {expenses.length === 1 ? "expense" : "expenses"}
                    </Badge>
                )}
            </CardHeader>

            <CardContent>
                {expenses.length === 0 ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-muted/40 px-6 text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm">
                            ₹
                        </div>

                        <p className="font-medium">
                            No expenses yet
                        </p>

                        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                            Add your first expense to start tracking your
                            spending.
                        </p>
                    </div>
                ) : (
                    <div>
                        {/* Table heading */}
                        <div className="hidden grid-cols-[1fr_120px_100px_40px] items-center gap-4 px-3 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
                            <span>Expense</span>
                            <span>Date</span>
                            <span className="text-right">Amount</span>
                            <span />
                        </div>

                        <Separator />

                        <div>
                            {expenses.map((expense, index) => (
                                <div key={expense.id}>
                                    <div className="group grid items-center gap-4 px-3 py-4 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_120px_100px_40px]">
                                        {/* Expense */}
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-sm">
                                                {categoryIcons[expense.category] ?? "•••"}
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

                                        {/* Date */}
                                        <p className="hidden text-sm text-muted-foreground sm:block">
                                            {expense.date}
                                        </p>

                                        {/* Amount */}
                                        <p className="text-sm font-semibold sm:text-right">
                                            ₹{expense.amount.toLocaleString("en-IN")}
                                        </p>

                                        {/* Delete */}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(expense.id)}
                                            className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">
                        Delete {expense.description}
                      </span>
                                        </Button>
                                    </div>

                                    {index < expenses.length - 1 && (
                                        <Separator />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}