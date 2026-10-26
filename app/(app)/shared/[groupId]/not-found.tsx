import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

export default function GroupNotFound() {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4">
			<Card className="w-full">
				<CardContent className="flex flex-col items-center gap-4 py-10 text-center">
					<h1 className="text-xl font-semibold">Group not found</h1>
					<p className="text-sm text-muted-foreground">
						This group doesn&apos;t exist or you don&apos;t have access to it.
					</p>
					<Link href="/shared">
						<Button>Back to shared groups</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
