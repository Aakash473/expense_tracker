const expenses = [
    {
        id: 1,
        category: "Food",
        description: "Lunch",
        amount: 450,
    },
    {
        id: 2,
        category: "Travel",
        description: "Cab",
        amount: 280,
    },
    {
        id: 3,
        category: "Shopping",
        description: "T-shirt",
        amount: 1200,
    },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-8">

                {/* Header */}
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Expense Tracker
                        </h1>

                        <p className="mt-1 text-sm text-zinc-400">
                            Manage your daily spending
                        </p>
                    </div>

                    <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800">
                        Logout
                    </button>
                </header>

                {/* Spending Summary */}
                <section className="mb-8">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-400">
                            Total Spending
                        </p>

                        <h2 className="mt-2 text-4xl font-bold">
                            ₹1,930
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Your total expenses
                        </p>
                    </div>
                </section>

                {/* Add Expense */}
                <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Add Expense
                    </h2>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Amount
                            </label>

                            <input
                                type="number"
                                placeholder="Enter amount"
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-zinc-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Category
                            </label>

                            <select className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-400">
                                <option>Food</option>
                                <option>Travel</option>
                                <option>Shopping</option>
                                <option>Bills</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm text-zinc-400">
                                Description
                            </label>

                            <input
                                type="text"
                                placeholder="What did you spend on?"
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-zinc-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Date
                            </label>

                            <input
                                type="date"
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-400"
                            />
                        </div>

                        <div className="flex items-end">
                            <button className="w-full rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 active:scale-[0.98]">
                                Add Expense
                            </button>
                        </div>

                    </div>
                </section>

                {/* Expenses */}
                <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Recent Expenses
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Your latest spending
                            </p>
                        </div>

                        <button className="text-sm text-zinc-400 transition hover:text-white">
                            View all
                        </button>
                    </div>

                    <div className="space-y-3">
                        {expenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-700 hover:bg-zinc-900"
                            >
                                <div>
                                    <p className="font-medium">
                                        {expense.description}
                                    </p>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        {expense.category}
                                    </p>
                                </div>

                                <p className="font-semibold">
                                    ₹{expense.amount}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Category Spending */}
                <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-xl font-semibold">
                        Spending by Category
                    </h2>

                    <div className="mt-6 space-y-5">

                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                <span className="text-zinc-400">
                  Food
                </span>

                                <span>
                  ₹450
                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                                <div className="h-full w-[35%] rounded-full bg-white" />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                <span className="text-zinc-400">
                  Travel
                </span>

                                <span>
                  ₹280
                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                                <div className="h-full w-[20%] rounded-full bg-white" />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                <span className="text-zinc-400">
                  Shopping
                </span>

                                <span>
                  ₹1,200
                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                                <div className="h-full w-[75%] rounded-full bg-white" />
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
}