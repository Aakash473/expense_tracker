"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { deleteExpense } from "./action";
import { Button } from "@/shared/ui/button";

type DeleteExpenseButtonProps = {
    expenseId: string;
    description: string;
};

export default function DeleteExpenseButton({
                                                expenseId,
                                                description,
                                            }: DeleteExpenseButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);

        try {
            const result = await deleteExpense(expenseId);

            if (!result.ok) {
                toast.error(result.error);
                return;
            }

            toast.success("Expense deleted successfully.");
            window.dispatchEvent(new Event("expenses:changed"));
        } catch {
            toast.error("Something went wrong while deleting the expense.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            isDisabled={isDeleting}
            onClick={handleDelete}
            className="text-muted-foreground opacity-100 transition-opacity hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100"
        >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">
                Delete {description}
            </span>
        </Button>
    );
}