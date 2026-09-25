"use client";

import { useState } from "react";

import DashboardHeader from "@/components/DashboardHeader";
import SpendingSummary from "@/components/SpendingSummary";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import CategorySpending from "@/components/CategorySpending";

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

    const handleDeleteExpense = (id: number) => {
        setExpenses((currentExpenses) =>
            currentExpenses.filter((expense) => expense.id !== id)
        );
    };

    const totalSpending = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <DashboardHeader />

                <SpendingSummary totalSpending={totalSpending} />

                <AddExpenseForm
                    amount={amount}
                    category={category}
                    description={description}
                    date={date}
                    setAmount={setAmount}
                    setCategory={setCategory}
                    setDescription={setDescription}
                    setDate={setDate}
                    onSubmit={handleSubmit}
                />

                <ExpenseList
                    expenses={expenses}
                    onDelete={handleDeleteExpense}
                />

                <CategorySpending expenses={expenses} />
            </div>
        </main>
    );
}