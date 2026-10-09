
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createExpenseSchema } from "./schema";
import { type } from "arktype";
import { createExpense } from "./action";

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
    onSuccess?: () => void;
};

function getLocalDateTime() {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, "0");

    return {
        date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    };
}

export default function CreateExpenseForm({
                                              categories,
                                              onSuccess,
                                          }: CreateExpenseFormProps) {
    const [initialDateTime] = useState(getLocalDateTime);
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(initialDateTime.date);
    const [time, setTime] = useState(initialDateTime.time);
    const [timeTouched, setTimeTouched] = useState(false);
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const isToday = date === getLocalDateTime().date;

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setDateError("");
        setTimeError("");

        if (!date) {
            setDateError("Choose an expense date.");
            return;
        }

        if (!isToday && !timeTouched) {
            setTimeError("Choose a time for dates other than today.");
            return;
        }

        const validation = createExpenseSchema({
            categoryId: category,
            amount: Number(amount),
            description: description.trim(),
            spentDate: date,
            spentTime: time,
        });

        if (validation instanceof type.errors) {
            toast.error(validation[0].message);
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await createExpense(validation);

            if (!result.ok) {
                const message = result.error;

                if (message.toLowerCase().includes("time")) {
                    setTimeError(message);
                } else if (message.toLowerCase().includes("date")) {
                    setDateError(message);
                } else {
                    toast.error(message);
                }

                return;
            }

            toast.success("Expense added successfully.");
            window.dispatchEvent(new Event("expenses:changed"));
            router.refresh();

            setAmount("");
            setCategory("");
            setDescription("");

            const current = getLocalDateTime();
            setDate(current.date);
            setTime(current.time);
            setTimeTouched(false);

            onSuccess?.();
        } catch {
            toast.error("Something went wrong while adding the expense.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
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
                            onChange={(event) => setAmount(event.target.value)}
                            placeholder="0.00"
                            className="pl-8"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                        selectedKey={category}
                        onSelectionChange={(key) => {
                            if (key) setCategory(String(key));
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

                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="What did you spend on?"
                        maxLength={200}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="expense-date">Date</Label>
                    <Input
                        id="expense-date"
                        type="date"
                        value={date}
                        max={getLocalDateTime().date}
                        onChange={(event) => {
                            setDate(event.target.value);
                            setDateError("");
                            setTimeError("");
                        }}
                        required
                        aria-invalid={!!dateError}
                        aria-describedby={dateError ? "expense-date-error" : undefined}
                    />
                    {dateError && (
                        <p id="expense-date-error" className="text-sm text-destructive">
                            {dateError}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="expense-time">Time</Label>
                    <Input
                        id="expense-time"
                        type="time"
                        value={time}
                        max={isToday ? getLocalDateTime().time : undefined}
                        onChange={(event) => {
                            setTime(event.target.value);
                            setTimeTouched(true);
                            setTimeError("");
                        }}
                        required={!isToday}
                        aria-invalid={!!timeError}
                        aria-describedby={timeError ? "expense-time-error" : undefined}
                    />
                    {timeError && (
                        <p id="expense-time-error" className="text-sm text-destructive">
                            {timeError}
                        </p>
                    )}
                </div>

                <div className="flex items-end sm:col-span-2">
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
    );
}
