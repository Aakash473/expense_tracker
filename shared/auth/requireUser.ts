import { createClient } from "@/shared/supabase/server";
import { UnauthorizedError } from "./UnauthorizedError";

export async function requireUser() {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        throw new UnauthorizedError();
    }

    return user;
}