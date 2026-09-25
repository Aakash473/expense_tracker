type Expense = {
    id: number;
    category: string;
    description: string;
    amount: number;
    date: string;
};

type CategorySpendingProps = {
    expenses: Expense[];
};

const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

export default function CategorySpending({
                                             expenses,
                                         }: CategorySpendingProps) {
    const getCategoryTotal = (category: string) => {
        return expenses
            .filter((expense) => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0);
    };

    return (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Spending by Category
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    See where your money is going.
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {categories.map((category) => {
                    const total = getCategoryTotal(category);

                    return (
                        <div
                            key={category}
                            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700"
                        >
                            <p className="text-sm text-zinc-500">{category}</p>

                            <p className="mt-2 text-xl font-semibold text-white">
                                ₹{total.toLocaleString("en-IN")}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}