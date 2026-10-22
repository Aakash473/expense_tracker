"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/shared/supabase/client";
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";

export default function LogoutButton() {
	const router = useRouter();
	const supabase = createClient();

	async function handleLogout() {
		await supabase.auth.signOut();
		router.push("/login");
		router.refresh();
	}

	return (
		<SidebarMenuItem>
			<SidebarMenuButton tooltip="Logout" onPress={handleLogout}>
				<LogOut />
				<span>Logout</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
