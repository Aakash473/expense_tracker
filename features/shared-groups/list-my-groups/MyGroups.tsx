"use client";

import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

import { orpc } from "@/lib/orpc/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export default function MyGroups() {
	const groupsQuery = useQuery(orpc.sharedGroups.listMy.queryOptions());

	if (groupsQuery.isPending) {
		return (
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{[1, 2, 3].map((item) => (
					<Card key={item}>
						<CardHeader className="space-y-2">
							<Skeleton className="h-5 w-2/3" />
							<Skeleton className="h-4 w-full" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-4 w-1/3" />
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	if (groupsQuery.isError) {
		return (
			<Card>
				<CardContent className="py-8 text-center text-sm text-destructive">
					{groupsQuery.error.message ||
						"Unable to load your groups. Please try again."}
				</CardContent>
			</Card>
		);
	}

	const groups = groupsQuery.data;

	if (groups.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center gap-3 py-12 text-center">
					<div className="rounded-full bg-muted p-3">
						<Users className="h-6 w-6 text-muted-foreground" />
					</div>
					<p className="font-medium">You&apos;re not in any groups yet</p>
					<p className="text-sm text-muted-foreground">
						Create a group to start managing shared expenses.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{groups.map((group) => (
				<Card key={group.id}>
					<CardHeader>
						<CardTitle className="truncate">{group.name}</CardTitle>
						{group.description && (
							<p className="text-sm text-muted-foreground">
								{group.description}
							</p>
						)}
					</CardHeader>

					<CardContent className="flex items-center justify-between gap-3">
						<span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium capitalize">
							{group.role}
						</span>
						<span className="flex items-center gap-1.5 text-sm text-muted-foreground">
							<Users className="h-4 w-4" />
							{group.acceptedMemberCount}{" "}
							{group.acceptedMemberCount === 1 ? "member" : "members"}
						</span>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
