"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/shared/supabase/client";

import { Button } from "@/shared/ui/button";

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();

        router.push("/login");
        router.refresh();
    };

    return (
        <Button
            variant="outline"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
}