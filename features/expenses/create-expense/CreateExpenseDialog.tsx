"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";

import CreateExpenseForm from "./CreateExpenseForm";

type CreateExpenseDialogProps = {
    categories: {
        id: string;
        name: string;
    }[];
};

export default function CreateExpenseDialog({
                                                categories,
                                            }: CreateExpenseDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DialogTrigger
            isOpen={isOpen}
            onOpenChange={setIsOpen}
        >
            <Button
                type="button"
                size="sm"
                aria-label="Add expense"
            >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">
                    Add expense
                </span>
            </Button>

            <Dialog className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
                <DialogTitle>Add expense</DialogTitle>

                <DialogDescription>
                    Add a new expense to your tracker.
                </DialogDescription>

                <CreateExpenseForm
                    categories={categories}
                    onSuccess={() => setIsOpen(false)}
                />
            </Dialog>
        </DialogTrigger>
    );
}