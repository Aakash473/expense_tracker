import type { ReactNode } from "react";

import LogoutButton from "@/features/auth/logout/LogoutButton";
import DashboardSidebar from "@/shared/layout/DashboardSidebar";
import ThemeToggle from "@/shared/theme/ThemeToggle";
import {
	SidebarInset,
	SidebarMenuItem,
	SidebarProvider,
} from "@/shared/ui/sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<DashboardSidebar
				footerItems={
					<>
						<SidebarMenuItem>
							<ThemeToggle inSidebar />
						</SidebarMenuItem>
						<LogoutButton />
					</>
				}
			/>

			<SidebarInset className="min-w-0">
				<main className="min-h-screen min-w-0 bg-background text-foreground">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
