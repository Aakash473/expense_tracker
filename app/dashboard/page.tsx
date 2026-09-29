import { getCategories } from "@/lib/db/queries/categories";
import { getUserExpenses } from "./actions";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
    const categories = await getCategories();
    const expenses = await getUserExpenses();

    return (
        <DashboardClient
            categories={categories}
            initialExpenses={expenses}
        />
    );
}