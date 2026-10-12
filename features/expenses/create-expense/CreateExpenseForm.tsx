
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    Plus,
    CalendarDays,
    Clock,
    ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type } from "arktype";
import { parseDate as parseCalendarDate } from "@internationalized/date";

import { createExpenseSchema } from "./schema";
import { createExpense } from "./action";
import {
    getLocalDateTime,
    formatDate,
    formatTime,
    to24Hour,
    toSpentAt,
} from "./utils";

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
import { Calendar } from "@/shared/ui/calendar";
import {
    Popover,
    PopoverTrigger,
} from "@/shared/ui/popover";

type Category = {
    id: string;
    name: string;
};

type CreateExpenseFormProps = {
    categories: Category[];
    onSuccess?: () => void;
};



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

    const [timeError, setTimeError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const today = getLocalDateTime().date;
    const isToday = date === today;

    const [hourText, minuteText] = time.split(":");
    const hours = Number(hourText);
    const minutes = Number(minuteText);
    const displayHour = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";

    function updateTime(
        hour: number,
        minute: number,
        ampm: string
    ) {
        setTime(to24Hour(hour, minute, ampm));
        setTimeError("");
    }


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setTimeError("");

        if (!time) {
            setTimeError("Choose a time");
            return;
        }

        const validation = createExpenseSchema({
            categoryId: category,
            amount: Number(amount),
            description: description.trim(),
            spentAt: toSpentAt(date, time),
        });

        if (validation instanceof type.errors) {
            const error = validation[0];

            if (error.path[0] === "spentAt") {
                setTimeError(error.message);
            } else {
                toast.error(error.message);
            }

            return;
        }

        setIsSubmitting(true);

        try {
            const result = await createExpense(validation);

            if (!result.ok) {
                toast.error(result.error);
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

            onSuccess?.();
        } catch {
            toast.error(
                "Something went wrong while adding the expense."
            );
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
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

                {/* Description */}
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Description</Label>

                    <Input
                        id="description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="What did you spend on?"
                        maxLength={200}
                        required
                    />
                </div>

                {/* Expense date */}
                <div className="space-y-2">
                    <Label>Expense date</Label>

                    <PopoverTrigger>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-full justify-between font-normal"
                        >
                            <span className="flex items-center gap-3">
                                <CalendarDays className="h-4 w-4 text-primary" />
                                {formatDate(date)}
                            </span>

                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>

                        <Popover className="w-auto rounded-xl p-2">
                            <Calendar
                                value={parseCalendarDate(date)}
                                maxValue={parseCalendarDate(today)}

                                onChange={(selectedDate) => {
                                    if (!selectedDate) return;

                                    const pad = (value: number) =>
                                        String(value).padStart(2, "0");

                                    const selectedDateString =
                                        `${selectedDate.year}-${pad(selectedDate.month)}-${pad(selectedDate.day)}`;

                                    setDate(selectedDateString);
                                    setTimeError("");

                                    if (selectedDateString !== today) {
                                        setTime("");
                                    } else {
                                        setTime(getLocalDateTime().time);
                                    }
                                }}

                            />
                        </Popover>
                    </PopoverTrigger>

                </div>

                {/* Expense time */}
                <div className="space-y-2">
                    <Label>Expense time</Label>

                    <PopoverTrigger>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-full justify-between font-normal"
                        >
                            <span className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-primary" />
                                {formatTime(time)}
                            </span>

                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>

                        <Popover className="w-72 rounded-xl p-4">
                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium">
                                        Select time
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Choose when you made this expense.
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div className="space-y-1">
                                        <Label>Hour</Label>

                                        <Select
                                            selectedKey={String(displayHour)}
                                            onSelectionChange={(key) => {
                                                if (key) {
                                                    updateTime(
                                                        Number(key),
                                                        minutes,
                                                        period
                                                    );
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {Array.from(
                                                    { length: 12 },
                                                    (_, index) => index + 1
                                                ).map((hour) => (
                                                    <SelectItem
                                                        key={hour}
                                                        id={String(hour)}
                                                    >
                                                        {String(hour).padStart(2, "0")}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Minute</Label>

                                        <Select
                                            selectedKey={String(minutes).padStart(2, "0")}
                                            onSelectionChange={(key) => {
                                                if (key) {
                                                    updateTime(
                                                        displayHour,
                                                        Number(key),
                                                        period
                                                    );
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {Array.from(
                                                    { length: 60 },
                                                    (_, index) => index
                                                ).map((minute) => (
                                                    <SelectItem
                                                        key={minute}
                                                        id={String(minute).padStart(2, "0")}
                                                    >
                                                        {String(minute).padStart(2, "0")}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Period</Label>

                                        <Select
                                            selectedKey={period}
                                            onSelectionChange={(key) => {
                                                if (key) {
                                                    updateTime(
                                                        displayHour,
                                                        minutes,
                                                        String(key)
                                                    );
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem id="AM">AM</SelectItem>
                                                <SelectItem id="PM">PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </Popover>
                    </PopoverTrigger>

                    <p className="text-xs text-muted-foreground">
                        {isToday
                            ? "Defaults to the current local time."
                            : "Choose the time you made this expense."}
                    </p>

                    {timeError && (
                        <p className="text-sm text-destructive">
                            {timeError}
                        </p>
                    )}
                </div>

                {/* Submit */}
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
