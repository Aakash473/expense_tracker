type SpendingSummaryProps = {
    totalSpending: number;
};

export default function SpendingSummary({
                                            totalSpending,
                                        }: SpendingSummaryProps) {
    return (
        <section className="mb-8">
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/20">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.03] blur-2xl transition-all duration-500 group-hover:bg-white/[0.06]" />

                <div className="relative">
                    <p className="text-sm font-medium text-zinc-400">
                        Total Spending
                    </p>

                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                        ₹{totalSpending.toLocaleString("en-IN")}
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Your total expenses
                    </p>
                </div>
            </div>
        </section>
    );
}