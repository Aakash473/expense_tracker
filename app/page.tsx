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
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <DashboardHeader />

                <div className="mt-10 grid grid-cols-12 gap-6">
                    {/* Total Spending */}
                    <div className="col-span-12 lg:col-span-4">
                        <SpendingSummary totalSpending={totalSpending} />
                    </div>

                    {/* Add Expense */}
                    <div className="col-span-12 lg:col-span-8">
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
                    </div>

                    {/* Recent Expenses */}
                    <div className="col-span-12 lg:col-span-8">
                        <ExpenseList
                            expenses={expenses}
                            onDelete={handleDeleteExpense}
                        />
                    </div>

                    {/* Category Statistics */}
                    <div className="col-span-12 lg:col-span-4">
                        <CategorySpending expenses={expenses} />
                    </div>
                </div>
            </div>
        </main>
    );
}