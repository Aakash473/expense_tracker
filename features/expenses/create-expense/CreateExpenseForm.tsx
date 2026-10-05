"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createExpenseSchema } from "./schema";

import { createExpense } from "./action";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";

type Category = {
    id: string;
    name: string;
};

type CreateExpenseFormProps = {
    categories: Category[];
};

export default function CreateExpenseForm({
                                              categories,
                                          }: CreateExpenseFormProps) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const validation = createExpenseSchema.safeParse({
            categoryId: category,
            amount: Number(amount),
            description: description.trim(),
        });

        if (!validation.success) {
            toast.error(validation.error.issues[0].message);
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await createExpense(validation.data);

            if (!result.ok) {
                toast.error(result.error);
                return;
            }

            toast.success("Expense added successfully.");
            router.refresh();

            setAmount("");
            setCategory("");
            setDescription("");
            setDate("");
        } catch {
            toast.error("Something went wrong while adding the expense.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <p className="text-sm text-muted-foreground">
                    Quick action
                </p>
                <CardTitle>Add Expense</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>

                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                    ₹
                                </span>

                                <Input
                                    id="amount"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={amount}
                                    onChange={(event) =>
                                        setAmount(event.target.value)
                                    }
                                    placeholder="0.00"
                                    className="pl-8"
                                    required
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label>Category</Label>

                            <Select
                                selectedKey={category}
                                onSelectionChange={(key) => {
                                    if (key) {
                                        setCategory(String(key));
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((categoryItem) => (
                                        <SelectItem
                                            key={categoryItem.id}
                                            id={categoryItem.id}
                                        >
                                            {categoryItem.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="description">Description</Label>

                            <Input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="What did you spend on?"
                                maxLength={200}
                                required
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <Label htmlFor="expense-date">Date</Label>

                            <Input
                                id="expense-date"
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                                onClick={(event) =>
                                    event.currentTarget.showPicker()
                                }
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex items-end">
                            <Button
                                type="submit"
                                className="w-full"
                                isDisabled={isSubmitting}
                            >
                                <Plus />
                                {isSubmitting ? "Adding..." : "Add Expense"}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}