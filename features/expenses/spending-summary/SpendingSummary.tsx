import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/ui/ui/card";
import { Badge } from "@/shared/ui/ui/badge";

type SpendingSummaryProps = {
    totalSpending: number;
};

export default function SpendingSummary({
                                            totalSpending,
                                        }: SpendingSummaryProps) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Total Spending
                    </p>

                    <CardTitle className="mt-2 text-3xl">
                        ₹{totalSpending.toLocaleString("en-IN")}
                    </CardTitle>
                </div>

                <Badge variant="secondary">
                    {totalSpending === 0 ? "No activity" : "Active"}
                </Badge>
            </CardHeader>

            <CardContent>
                <div className="mt-2 rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                        Overall recorded expenses
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Your spending total updates automatically when you add
                        or remove an expense.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}