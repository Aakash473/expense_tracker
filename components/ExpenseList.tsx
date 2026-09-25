type Expense = {
    id: number;
    category: string;
    description: string;
    amount: number;
    date: string;
};

type ExpenseListProps = {
    expenses: Expense[];
    onDelete: (id: number) => void;
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
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900">
                        Recent Expenses
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Your latest transactions
                    </p>
                </div>

                {expenses.length > 0 && (
                    <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600">
            {expenses.length}{" "}
                        {expenses.length === 1 ? "expense" : "expenses"}
          </span>
                )}
            </div>

            <div className="space-y-3">
                {expenses.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-6 py-12 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                            ₹
                        </div>

                        <p className="font-semibold text-zinc-700">
                            No expenses yet
                        </p>

                        <p className="mt-1 text-sm text-zinc-400">
                            Add your first expense above to get started.
                        </p>
                    </div>
                ) : (
                    expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-200 hover:bg-white hover:shadow-md"
                        >
                            <div className="flex min-w-0 items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                                    {categoryIcons[expense.category] ?? "•••"}
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-zinc-900">
                                        {expense.description}
                                    </p>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        {expense.category} · {expense.date}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <p className="font-bold text-zinc-900">
                                    ₹{expense.amount.toLocaleString("en-IN")}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => onDelete(expense.id)}
                                    className="rounded-lg px-2.5 py-2 text-xs font-semibold text-zinc-400 opacity-70 transition-all duration-200 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}