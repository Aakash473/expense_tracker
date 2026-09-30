import { getCategories } from "@/lib/db/queries/categories";
import { getUserExpenses } from "./actions";
import DashboardClient from "@/components/DashboardClient";
export const dynamic = "force-dynamic";


export default async function DashboardPage() {
    const [categories, expenses] = await Promise.all([
        getCategories(),
        getUserExpenses(),
    ]);

    return (
        <DashboardClient
            categories={categories}
            initialExpenses={expenses}
        />
    );
}