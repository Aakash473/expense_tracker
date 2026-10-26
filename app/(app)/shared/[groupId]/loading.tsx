import PageHeader from "@/shared/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export default function GroupDetailsLoading() {
	return (
		<div>
			<PageHeader title="Group details" />

			<div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
				<Skeleton className="h-5 w-2/3" />

				<section>
					<Skeleton className="mb-4 h-6 w-24" />

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{[1, 2, 3].map((item) => (
							<Card key={item}>
								<CardHeader>
									<Skeleton className="h-5 w-2/3" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-6 w-16" />
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
