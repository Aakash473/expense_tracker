"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { orpc } from "@/lib/orpc/query";
import { Button } from "@/shared/ui/button";

type UseLastMonthBudgetButtonProps = {
    amount: number;
};

const money = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

export default function UseLastMonthBudgetButton({
                                                     amount,
                                                 }: UseLastMonthBudgetButtonProps) {
    const router = useRouter();

    const setBudgetMutation = useMutation(
        orpc.budgets.setMonthly.mutationOptions({
            onSuccess: () => {
                toast.success("Budget saved");
                router.refresh();
            },
            onError: (error) => {
                toast.error(
                    error.message || "Something went wrong while saving."
                );
            },
        })
    );

    function handleUseBudget() {
        setBudgetMutation.mutate({ amount });
    }

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            isDisabled={setBudgetMutation.isPending}
            onPress={handleUseBudget}
        >
            {setBudgetMutation.isPending
                ? "Saving..."
                : `Use last month's ${money(amount)}`}
        </Button>
    );

}