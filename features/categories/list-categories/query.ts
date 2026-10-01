
import { db } from "@/shared/db";
import { categories } from "@/shared/db/schema";

export async function getCategories() {
    return db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(categories.name);
}
