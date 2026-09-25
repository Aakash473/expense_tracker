type DashboardHeaderProps = {
    onLogout?: () => void;
};

export default function DashboardHeader({
                                            onLogout,
                                        }: DashboardHeaderProps) {
    return (
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm">
                        ₹
                    </div>

                    <span className="text-sm font-semibold tracking-wide text-zinc-500">
            PERSONAL FINANCE
          </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                    Expense Tracker
                </h1>

                <p className="mt-2 text-sm text-zinc-500 sm:text-base">
                    Keep track of your spending, one expense at a time.
                </p>
            </div>

            <button
                type="button"
                onClick={onLogout}
                className="w-fit rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
            >
                Logout
            </button>
        </header>
    );
}