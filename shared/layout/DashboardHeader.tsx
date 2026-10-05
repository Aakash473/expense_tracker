import { Badge } from "@/shared/ui/badge";
import { Wallet } from "lucide-react";
import LogoutButton from "@/features/auth/logout/LogoutButton";
import ThemeToggle from "@/shared/theme/ThemeToggle";

export default function DashboardHeader() {
    return (
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-card shadow-sm">
                    <Wallet className="h-5 w-5" />
                </div>

                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
                            Expense Tracker
                        </h1>

                        <Badge variant="secondary">
                            Personal
                        </Badge>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Keep track of your spending and stay in control.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <LogoutButton />
            </div>
        </header>
    );
}