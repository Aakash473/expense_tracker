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

function getLocalDateTime() {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, "0");

    return {
        date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    };
}

function formatDate(value: string) {
    if (!value) return "Choose a date";

    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatTime(value: string) {
    if (!value) return "Select time";

    const [hours, minutes] = value.split(":").map(Number);
    const hour12 = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";

    return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
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
        const hour24 =
            ampm === "PM" ? (hour % 12) + 12 : hour % 12;

        setTime(
            `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        );
        setTimeTouched(true);
        setTimeError("");
    }
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setDateError("");
        setTimeError("");

        if (!date) {
            setDateError("Choose an expense date.");
            return;
        }

        if (date > today) {
            setDateError("Expense date cannot be in the future.");
            return;
        }

        if (!time) {
            setTimeError("Choose an expense time.");
            return;
        }

        if (!isToday && !timeTouched) {
            setTimeError("Choose a time for dates other than today.");
            return;
        }

        if (isToday && time > getLocalDateTime().time) {
            setTimeError("Expense time cannot be in the future.");
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
                {/* Custom date picker */}
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

                                    setDate(
                                        `${selectedDate.year}-${pad(selectedDate.month)}-${pad(selectedDate.day)}`
                                    );
                                    setDateError("");
                                    setTimeError("");
                                }}
                            />
                        </Popover>
                    </PopoverTrigger>

                    {dateError && (
                        <p className="text-sm text-destructive">
                            {dateError}
                        </p>
                    )}
                </div>
                {/* Custom time picker */}
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