"use client";

import { useEffect } from "react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

export default function GroupDetailsError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Group details error:", error);
	}, [error]);

	return (
		<div className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4">
			<Card className="w-full">
				<CardContent className="flex flex-col items-center gap-4 py-10 text-center">
					<h1 className="text-xl font-semibold">Unable to load group</h1>
					<p className="text-sm text-muted-foreground">
						Something went wrong while loading this group. Please try again.
					</p>
					<Button onClick={reset}>Try again</Button>
				</CardContent>
			</Card>
		</div>
	);
}
