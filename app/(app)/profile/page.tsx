import { redirect } from "next/navigation";
import CopyProfileValueButton from "@/features/profile/CopyProfileValueButton";
import { requireUser } from "@/shared/auth/requireUser";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import PageHeader from "@/shared/layout/PageHeader";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
	let user;

	try {
		user = await requireUser();
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			redirect("/login");
		}

		throw error;
	}

	return (
		<div className="space-y-6">
			<PageHeader title="Profile" />

			<section className="mx-auto w-full max-w-2xl space-y-4 px-4 sm:px-6">
				<div>
					<h2 className="text-xl font-semibold">Account information</h2>
					<p className="text-sm text-muted-foreground">Your account details.</p>
				</div>

				<div className="space-y-5 rounded-xl border p-4 sm:p-6">
					<div className="flex min-w-0 items-center justify-between gap-3">
						<div className="min-w-0 flex-1 space-y-2">
							<p className="text-sm font-medium text-muted-foreground">
								Email address
							</p>
							<p className="break-words text-sm sm:text-base">
								{user.email ?? "No email available"}
							</p>
						</div>

						<CopyProfileValueButton
							value={user.email ?? ""}
							label="Email address"
						/>
					</div>

					<div className="flex min-w-0 items-center justify-between gap-3">
						<div className="min-w-0 flex-1 space-y-2">
							<p className="text-sm font-medium text-muted-foreground">
								User ID
							</p>
							<p className="break-all font-mono text-sm">{user.id}</p>
						</div>

						<CopyProfileValueButton value={user.id} label="User ID" />
					</div>
				</div>
			</section>
		</div>
	);
}
