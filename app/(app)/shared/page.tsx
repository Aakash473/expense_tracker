import CreateGroupDialog from "@/features/shared-groups/create-group/CreateGroupDialog";
import PageHeader from "@/shared/layout/PageHeader";

export default function SharedPage() {
	return (
		<>
			<PageHeader title="Shared Expenses" actions={<CreateGroupDialog />} />

			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<p className="text-sm text-muted-foreground">
					Manage shared expenses here.
				</p>
			</div>
		</>
	);
}
