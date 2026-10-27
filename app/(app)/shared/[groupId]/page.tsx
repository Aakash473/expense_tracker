import { notFound, redirect } from "next/navigation";

import { getGroupDetails } from "@/features/shared-groups/get-group-details/query";
import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import PageHeader from "@/shared/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const dynamic = "force-dynamic";

type GroupDetailsPageProps = {
	params: Promise<{ groupId: string }>;
};

export default async function GroupDetailsPage({
	params,
}: GroupDetailsPageProps) {
	let user;

	try {
		user = await requireUser();
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			redirect("/login");
		}

		throw error;
	}

	const { groupId } = await params;

	const group = await getGroupDetails(groupId, user.id).catch(() => notFound());

	if (!group) {
		notFound();
	}

	return (
		<div>
			<PageHeader title={group.name} />

			<div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
				{group.description && (
					<p className="text-muted-foreground">{group.description}</p>
				)}

				<section>
					<h2 className="mb-4 text-lg font-semibold">Members</h2>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{group.members.map((member) => (
							<Card key={member.id}>
								<CardHeader>
									<CardTitle className="text-base">
										{member.email ?? "Unknown member"}
									</CardTitle>
								</CardHeader>

								<CardContent>
									<span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium capitalize">
										{member.role}
									</span>
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
