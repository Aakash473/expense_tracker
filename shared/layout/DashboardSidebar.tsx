import { Settings, Wallet } from "lucide-react";
import type { ReactNode } from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/ui/sidebar";

import DashboardSidebarNav from "./DashboardSidebarNav";

type DashboardSidebarProps = {
	footerItems?: ReactNode;
};

export default function DashboardSidebar({
	footerItems,
}: DashboardSidebarProps) {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							href="/personal"
							size="lg"
							tooltip="Expense Tracker"
						>
							<Wallet />
							<span className="font-mono font-semibold">Expense Tracker</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<DashboardSidebarNav />
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton href="/settings" tooltip="Settings">
							<Settings />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>

					{footerItems}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
