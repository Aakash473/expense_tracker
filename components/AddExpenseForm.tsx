type AddExpenseFormProps = {
    amount: string;
    category: string;
    description: string;
    date: string;
    setAmount: (value: string) => void;
    setCategory: (value: string) => void;
    setDescription: (value: string) => void;
    setDate: (value: string) => void;
    onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function AddExpenseForm({
                                           amount,
                                           category,
                                           description,
                                           date,
                                           setAmount,
                                           setCategory,
                                           setDescription,
                                           setDate,
                                           onSubmit,
                                       }: AddExpenseFormProps) {
    return (
        <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Add Expense
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    Record a new expense to keep track of your spending.
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-400">
                            Amount
                        </label>

                        <input
                            type="number"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            placeholder="Enter amount"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-zinc-600 hover:border-zinc-600 focus:border-zinc-400 focus:ring-2 focus:ring-white/5"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-400">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-200 hover:border-zinc-600 focus:border-zinc-400 focus:ring-2 focus:ring-white/5"
                        >
                            <option>Food</option>
                            <option>Travel</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-zinc-400">
                            Description
                        </label>

                        <input
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="What did you spend on?"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-zinc-600 hover:border-zinc-600 focus:border-zinc-400 focus:ring-2 focus:ring-white/5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="expense-date"
                            className="mb-2 block text-sm font-medium text-zinc-400"
                        >
                            Date
                        </label>

                        <input
                            id="expense-date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            onClick={(event) => event.currentTarget.showPicker()}
                            className="w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-200 hover:border-zinc-600 focus:border-zinc-400 focus:ring-2 focus:ring-white/5"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/5 active:translate-y-0 active:scale-[0.98]"
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}