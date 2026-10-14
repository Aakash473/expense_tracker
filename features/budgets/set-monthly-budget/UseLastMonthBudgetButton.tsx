
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { setMonthlyBudget } from "./action";
import { Button } from "@/shared/ui/button";

type UseLastMonthBudgetButtonProps = {
    amount: number;
};

const money = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

export default function UseLastMonthBudgetButton({
                                                     amount,
                                                 }: UseLastMonthBudgetButtonProps) {
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    async function handleUseBudget() {
        setIsSaving(true);

        try {
            const result = await setMonthlyBudget({ amount });

            if (!result.ok) {
                toast.error(result.error);
                return;
            }

            toast.success("Budget saved");
            router.refresh();
        } catch {
            toast.error("Something went wrong while saving the budget.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            isDisabled={isSaving}
            onPress={handleUseBudget}
        >
            {isSaving
                ? "Saving..."
                : `Use last month's ${money(amount)}`}
        </Button>
    );
}
