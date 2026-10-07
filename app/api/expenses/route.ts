import { getExpenseSummary } from "@/features/expenses/list-expenses/query";
import { UnauthorizedError } from "@/shared/auth/UnauthorizedError";
import { requireUser } from "@/shared/auth/requireUser";

export async function GET() {
    try {
        const user = await requireUser();
        const { expenses } = await getExpenseSummary(user.id);

        return Response.json(expenses);
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        throw error;
    }
}