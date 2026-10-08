import { Badge } from "@/shared/ui/badge";

import LogoutButton from "@/features/auth/logout/LogoutButton";
import ThemeToggle from "@/shared/theme/ThemeToggle";
import CreateExpenseDialog from "@/features/expenses/create-expense/CreateExpenseDialog";
import { getCategories } from "@/features/categories/list-categories/query";
import { SidebarTrigger } from "@/shared/ui/sidebar";

export default async function DashboardHeader() {
    const categories = await getCategories();
    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-14 items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                        <SidebarTrigger />

                        <div className="flex min-w-0 items-center gap-2">
                            <h1 className="truncate font-mono text-xl font-semibold tracking-tight sm:text-3xl">
                                Expense Tracker
                            </h1>

                            <Badge
                                variant="secondary"
                                className="shrink-0 text-xs"
                            >
                                Personal
                            </Badge>
                        </div>

                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <CreateExpenseDialog categories={categories} />
                        <ThemeToggle />
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </header>
    );
}