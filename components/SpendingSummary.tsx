type SpendingSummaryProps = {
    totalSpending: number;
};

export default function SpendingSummary({
                                            totalSpending,
                                        }: SpendingSummaryProps) {
    return (
        <section>
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-7 text-white shadow-xl shadow-zinc-900/10 sm:p-8">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.06] blur-3xl" />
                <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />

                <div className="relative">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-zinc-400">
                                Total Spending
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                                ₹{totalSpending.toLocaleString("en-IN")}
                            </h2>

                            <p className="mt-3 text-sm text-zinc-400">
                                Your overall recorded expenses
                            </p>
                        </div>

                        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl sm:flex">
                            ₹
                        </div>
                    </div>

                    <div className="mt-7 h-px bg-white/10" />

                    <div className="mt-5 flex items-center gap-2 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-medium text-zinc-300">
              {totalSpending === 0 ? "No expenses yet" : "Tracking active"}
            </span>
                    </div>
                </div>
            </div>
        </section>
    );
}