import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

                {/* Dashboard Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="mt-10 grid grid-cols-12 gap-6">

                    {/* Total Spending */}
                    <div className="col-span-12 lg:col-span-4">
                        <Skeleton className="h-48 w-full rounded-xl" />
                    </div>

                    {/* Add Expense */}
                    <div className="col-span-12 lg:col-span-8">
                        <Skeleton className="h-48 w-full rounded-xl" />
                    </div>

                    {/* Recent Expenses */}
                    <div className="col-span-12 lg:col-span-8">
                        <Skeleton className="h-80 w-full rounded-xl" />
                    </div>

                    {/* Category Statistics */}
                    <div className="col-span-12 lg:col-span-4">
                        <Skeleton className="h-80 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </main>
    );
}