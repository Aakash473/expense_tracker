"use client";

import { useState } from "react";

type Expense = {
    id: number;
    category: string;
    description: string;
    amount: number;
    date: string;
};

export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!amount || !description || !date) {
            return;
        }

        const newExpense: Expense = {
            id: Date.now(),
            category,
            description,
            amount: Number(amount),
            date,
        };

        setExpenses((currentExpenses) => [
            ...currentExpenses,
            newExpense,
        ]);

        setAmount("");
        setCategory("Food");
        setDescription("");
        setDate("");
    };

    const totalSpending = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

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
                            ₹{totalSpending.toLocaleString("en-IN")}
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

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-5 md:grid-cols-2">

                            {/* Amount */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-400">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(event) => setAmount(event.target.value)}
                                    placeholder="Enter amount"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-zinc-400"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-400">
                                    Category
                                </label>

                                <select
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-400"
                                >
                                    <option>Food</option>
                                    <option>Travel</option>
                                    <option>Shopping</option>
                                    <option>Bills</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm text-zinc-400">
                                    Description
                                </label>

                                <input
                                    type="text"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    placeholder="What did you spend on?"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-zinc-400"
                                />
                            </div>


                                {/* Date */}
                            <div>
                                <label
                                    htmlFor="expense-date"
                                    className="mb-2 block text-sm text-zinc-400"
                                >
                                    Date
                                </label>

                                <input
                                    id="expense-date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    onClick={(event) => event.currentTarget.showPicker()}
                                    className="w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-400"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 active:scale-[0.98]"
                                >
                                    Add Expense
                                </button>
                            </div>

                        </div>
                    </form>
                </section>

                {/* Expenses */}
                <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">
                            Recent Expenses
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Your latest spending
                        </p>
                    </div>

                    <div className="space-y-3">
                        {expenses.length === 0 ? (
                            <p className="py-8 text-center text-sm text-zinc-500">
                                No expenses added yet.
                            </p>
                        ) : (
                            expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-700 hover:bg-zinc-900"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {expense.description}
                                        </p>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {expense.category} · {expense.date}
                                        </p>
                                    </div>

                                    <p className="font-semibold">
                                        ₹{expense.amount}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Category Spending */}
                <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-xl font-semibold">
                        Spending by Category
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Category calculations will be added next.
                    </p>
                </section>

            </div>
        </main>
    );
}