import CreateGroupDialog from "@/features/shared-groups/create-group/CreateGroupDialog";

export default function SharedPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">
						Shared Expenses
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Manage shared expenses here.
					</p>
				</div>

				<CreateGroupDialog />
			</div>
		</div>
	);
}
