import CreateGroupDialog from "@/features/shared-groups/create-group/CreateGroupDialog";
import MyGroups from "@/features/shared-groups/list-my-groups/MyGroups";
import PageHeader from "@/shared/layout/PageHeader";

export default function SharedPage() {
	return (
		<>
			<PageHeader title="Shared Expenses" actions={<CreateGroupDialog />} />

			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<MyGroups />
			</div>
		</>
	);
}
