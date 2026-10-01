import { getCategories } from "@/lib/db/queries/categories";
import { getUserExpenses } from "./actions";
import DashboardClient from "@/components/DashboardClient";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const [categories, expensesResult] = await Promise.all([
        getCategories(),
        getUserExpenses(),
    ]);

    if (!expensesResult.ok) {
        throw new Error(expensesResult.error);
    }

    return (
        <DashboardClient
            categories={categories}
            initialExpenses={expensesResult.data}
        />
    );
}