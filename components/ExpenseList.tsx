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

export default function ExpenseList({
                                        expenses,
                                        onDelete,
                                    }: ExpenseListProps) {
    return (
        <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Recent Expenses
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    Your latest spending
                </p>
            </div>

            <div className="space-y-3">
                {expenses.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-800 py-10 text-center">
                        <p className="text-sm text-zinc-500">
                            No expenses added yet.
                        </p>
                    </div>
                ) : (
                    expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
                        >
                            <div className="min-w-0">
                                <p className="truncate font-medium text-white">
                                    {expense.description}
                                </p>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {expense.category} · {expense.date}
                                </p>
                            </div>

                            <div className="ml-4 flex shrink-0 items-center gap-4">
                                <p className="font-semibold text-white">
                                    ₹{expense.amount.toLocaleString("en-IN")}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => onDelete(expense.id)}
                                    className="rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-500 opacity-70 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
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