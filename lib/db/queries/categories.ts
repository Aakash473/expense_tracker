import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export async function getCategories() {
    return db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(categories.name);
}