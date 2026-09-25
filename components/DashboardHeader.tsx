type DashboardHeaderProps = {
    onLogout?: () => void;
};

export default function DashboardHeader({
                                            onLogout,
                                        }: DashboardHeaderProps) {
    return (
        <header className="mb-10 flex items-center justify-between">
            <div>
                <p className="mb-2 text-sm font-medium text-zinc-500">
                    Personal Finance
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Expense Tracker
                </h1>

                <p className="mt-2 text-sm text-zinc-400">
                    Manage your daily spending with ease.
                </p>
            </div>

            <button
                type="button"
                onClick={onLogout}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white active:scale-95"
            >
                Logout
            </button>
        </header>
    );
}