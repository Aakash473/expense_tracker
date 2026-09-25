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
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg">
                        +
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-zinc-900">
                            Add New Expense
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Add a transaction to your expense history.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                            Amount
                        </label>

                        <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                ₹
              </span>

                            <input
                                type="number"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                placeholder="0.00"
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-9 pr-4 text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition-all duration-200 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                        >
                            <option>Food</option>
                            <option>Travel</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                            Description
                        </label>

                        <input
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="What did you spend on?"
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="expense-date"
                            className="mb-2 block text-sm font-semibold text-zinc-700"
                        >
                            Date
                        </label>

                        <input
                            id="expense-date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            onClick={(event) => event.currentTarget.showPicker()}
                            className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition-all duration-200 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-zinc-900 px-5 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                        >
                            + Add Expense
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}