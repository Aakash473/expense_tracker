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

const categories = [
    { name: "Food", icon: "🍔" },
    { name: "Travel", icon: "✈️" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Bills", icon: "📄" },
    { name: "Other", icon: "•••" },
];

export default function CategorySpending({
                                             expenses,
                                         }: CategorySpendingProps) {
    const getCategoryTotal = (category: string) => {
        return expenses
            .filter((expense) => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0);
    };

    return (
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
                <h2 className="text-xl font-bold text-zinc-900">
                    Spending by Category
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    See where your money is going.
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {categories.map((category) => {
                    const total = getCategoryTotal(category.name);

                    return (
                        <div
                            key={category.name}
                            className="group rounded-2xl border border-zinc-100 bg-zinc-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-200 hover:bg-white hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                                    {category.icon}
                                </div>

                                <span className="text-xs font-medium text-zinc-400">
                  {category.name}
                </span>
                            </div>

                            <p className="mt-5 text-2xl font-bold tracking-tight text-zinc-900">
                                ₹{total.toLocaleString("en-IN")}
                            </p>

                            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-200">
                                <div
                                    className="h-full rounded-full bg-zinc-900 transition-all duration-500"
                                    style={{
                                        width: total > 0 ? "65%" : "0%",
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}