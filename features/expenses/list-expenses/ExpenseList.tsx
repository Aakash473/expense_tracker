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
} from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import type { Expense } from "./types";
import DeleteExpenseButton from "@/features/expenses/delete-expense/DeleteExpenseButton";

type ExpenseListProps = {
    expenses: Expense[];
};

const categoryIcons = {
    Food: Utensils,
    Travel: Plane,
    Shopping: ShoppingBag,
    Bills: FileText,
    Other: MoreHorizontal,
};

export default function ExpenseList({ expenses }: ExpenseListProps) {


    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <p className="text-sm text-muted-foreground">Activity</p>
                    <CardTitle className="mt-1">Recent Expenses</CardTitle>
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

                        <p className="font-medium">No expenses yet</p>

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
                            {expenses.map((expense, index) => (
                                <div key={expense.id}>
                                    <div className="group grid items-center gap-4 px-3 py-4 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_120px_100px_40px]">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-sm">
                                                {(() => {
                                                    const Icon = categoryIcons[expense.category as keyof typeof categoryIcons] ?? MoreHorizontal;
                                                    return <Icon className="h-5 w-5" />;
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

                                    {index < expenses.length - 1 && <Separator />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}