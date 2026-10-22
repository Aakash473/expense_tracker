import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export default function Loading() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			{/* Page Header Skeleton */}
			<div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
				<div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-3">
						{/* Sidebar trigger */}
						<Skeleton className="h-8 w-8 rounded-md" />

						{/* Page title */}
						<Skeleton className="h-7 w-52" />
					</div>

					{/* Add expense button */}
					<Skeleton className="h-8 w-28 rounded-md" />
				</div>
			</div>
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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
