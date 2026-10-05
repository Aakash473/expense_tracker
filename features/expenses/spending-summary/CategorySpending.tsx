
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import {
    Utensils,
    Plane,
    ShoppingBag,
    FileText,
    MoreHorizontal,
} from "lucide-react";
import { Progress } from "@/shared/ui/progress";
import { Badge } from "@/shared/ui/badge";
import type { Expense } from "@/features/expenses/list-expenses/types";

type CategorySpendingProps = {
    expenses: Expense[];
};

const categories = [
    { name: "Food", icon: Utensils },
    { name: "Travel", icon: Plane },
    { name: "Shopping", icon: ShoppingBag },
    { name: "Bills", icon: FileText },
    { name: "Other", icon: MoreHorizontal },
];

export default function CategorySpending({
                                             expenses,
                                         }: CategorySpendingProps) {
    const totalSpending = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const getCategoryTotal = (category: string) => {
        return expenses
            .filter((expense) => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0);
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Spending
                    </p>

                    <CardTitle className="mt-1">
                        By Category
                    </CardTitle>
                </div>

                <Badge variant="secondary">
                    {categories.length} categories
                </Badge>
            </CardHeader>

            <CardContent>
                <div className="space-y-5">
                    {categories.map((category) => {
                        const amount = getCategoryTotal(category.name);

                        const percentage =
                            totalSpending > 0
                                ? Math.round((amount / totalSpending) * 100)
                                : 0;

                        return (
                            <div key={category.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm">
                                            <category.icon className="h-5 w-5" />
                                        </div>

                                        <span className="text-sm font-medium">
                      {category.name}
                    </span>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-semibold">
                                            ₹{amount.toLocaleString("en-IN")}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {percentage}%
                                        </p>
                                    </div>
                                </div>

                                <Progress value={percentage} />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}