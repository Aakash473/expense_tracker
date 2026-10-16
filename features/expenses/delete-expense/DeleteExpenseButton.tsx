"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { orpc } from "@/lib/orpc/query";
import { Button } from "@/shared/ui/button";

type DeleteExpenseButtonProps = {
	expenseId: string;
	description: string;
};

export default function DeleteExpenseButton({
	expenseId,
	description,
}: DeleteExpenseButtonProps) {
	const queryClient = useQueryClient();
	const router = useRouter();

	const deleteExpenseMutation = useMutation(
		orpc.expenses.delete.mutationOptions({
			onSuccess: async () => {
				toast.success("Expense deleted successfully.");

				await queryClient.invalidateQueries({
					queryKey: orpc.expenses.list.key(),
				});

				router.refresh();
			},
			onError: (error) => {
				toast.error(
					error.message || "Something went wrong while deleting the expense.",
				);
			},
		}),
	);

	function handleDelete() {
		deleteExpenseMutation.mutate({ expenseId });
	}

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			isDisabled={deleteExpenseMutation.isPending}
			onClick={handleDelete}
			className="text-muted-foreground opacity-100 transition-opacity hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100"
		>
			<Trash2 className="h-4 w-4" />
			<span className="sr-only">Delete {description}</span>
		</Button>
	);
}
