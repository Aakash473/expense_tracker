import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type AddExpenseFormProps = {
    amount: string;
    category: string;
    description: string;
    date: string;
    setAmount: (value: string) => void;
    setCategory: (value: string) => void;
    setDescription: (value: string) => void;
    setDate: (value: string) => void;
    onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function AddExpenseForm({
                                           amount,
                                           category,
                                           description,
                                           date,
                                           setAmount,
                                           setCategory,
                                           setDescription,
                                           setDate,
                                           onSubmit,
                                       }: AddExpenseFormProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <p className="text-sm text-muted-foreground">
                    Quick action
                </p>

                <CardTitle>Add Expense</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="amount">
                                Amount
                            </Label>

                            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ₹
                </span>

                                <Input
                                    id="amount"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={amount}
                                    onChange={(event) =>
                                        setAmount(event.target.value)
                                    }
                                    placeholder="0.00"
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        {/* Category */}
                        <div className="space-y-2">
                            <Label>
                                Category
                            </Label>

                            <Select
                                selectedKey={category}
                                onSelectionChange={(key) => {
                                    if (key) {
                                        setCategory(String(key));
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem id="Food">Food</SelectItem>
                                    <SelectItem id="Travel">Travel</SelectItem>
                                    <SelectItem id="Shopping">Shopping</SelectItem>
                                    <SelectItem id="Bills">Bills</SelectItem>
                                    <SelectItem id="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Description */}
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="description">
                                Description
                            </Label>

                            <Input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="What did you spend on?"
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <Label htmlFor="expense-date">
                                Date
                            </Label>

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
                            >
                                <Plus />
                                Add Expense
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}