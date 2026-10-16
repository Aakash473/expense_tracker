"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { orpc } from "@/lib/orpc/query";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type SetBudgetDialogProps = {
    currentBudget: number | null;
};

export default function SetBudgetDialog({
                                            currentBudget,
                                        }: SetBudgetDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(
        currentBudget === null ? "" : String(currentBudget)
    );

    const router = useRouter();

    const setBudgetMutation = useMutation(
        orpc.budgets.setMonthly.mutationOptions({
            onSuccess: () => {
                toast.success("Budget saved");
                setIsOpen(false);
                router.refresh();
            },
            onError: () => {
                toast.error(
                    "Something went wrong while saving the budget."
                );
            },
        })
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setBudgetMutation.mutate({
            amount: Number(amount),
        });
    }

    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            {currentBudget === null ? (
                <Button type="button" size="sm">
                    Set budget
                </Button>
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Edit budget"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )}

            <Dialog className="sm:max-w-md">
                <DialogTitle>
                    {currentBudget === null
                        ? "Set monthly budget"
                        : "Edit monthly budget"}
                </DialogTitle>

                <DialogDescription>
                    Choose how much you plan to spend this month.
                </DialogDescription>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="budget-amount">Amount (₹)</Label>
                        <Input
                            id="budget-amount"
                            type="number"
                            min="0.01"
                            max="9999999999.99"
                            step="0.01"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            placeholder="Enter monthly budget"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onPress={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isDisabled={setBudgetMutation.isPending}
                        >
                            {setBudgetMutation.isPending
                                ? "Saving..."
                                : "Save budget"}
                        </Button>
                    </div>
                </form>
            </Dialog>
        </DialogTrigger>
    );

}