import { Skeleton } from "@/shared/ui/ui/skeleton";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/shared/ui/ui/card";

export default function Loading() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

                {/* Dashboard Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        {/* Header icon */}
                        <Skeleton className="h-11 w-11 rounded-xl" />

                        <div className="space-y-2">
                            <Skeleton className="h-8 w-56" />
                            <Skeleton className="h-4 w-72" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Theme toggle */}
                        <Skeleton className="h-8 w-8 rounded-md" />

                        {/* Logout */}
                        <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="mt-10 grid grid-cols-12 gap-6">

                    {/* Total Spending */}
                    <div className="col-span-12 lg:col-span-4">
                        <Card className="h-full">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-7 w-24 rounded-full" />
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <Skeleton className="h-12 w-28" />

                                <div className="space-y-3 rounded-xl p-4">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/5" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Add Expense */}
                    <div className="col-span-12 lg:col-span-8">
                        <Card className="h-full">
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-7 w-36" />
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                <Skeleton className="h-10 w-full" />

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Expenses */}
                    <div className="col-span-12 lg:col-span-8">
                        <Card className="h-full">
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-7 w-48" />
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <Skeleton className="h-16 w-full rounded-lg" />
                                <Skeleton className="h-16 w-full rounded-lg" />
                                <Skeleton className="h-16 w-full rounded-lg" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Category Statistics */}
                    <div className="col-span-12 lg:col-span-4">
                        <Card className="h-full">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-7 w-40" />
                                </div>

                                <Skeleton className="h-7 w-24 rounded-full" />
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}