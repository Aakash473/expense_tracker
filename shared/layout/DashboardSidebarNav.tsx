"use client";

import { LayoutDashboard, UserRound, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/ui/sidebar";

const navigationItems = [
	{
		title: "Personal",
		href: "/personal",
		icon: LayoutDashboard,
	},
	{
		title: "Shared",
		href: "/shared",
		icon: Users,
	},
	{
		title: "Profile",
		href: "/profile",
		icon: UserRound,
	},
];

export default function DashboardSidebarNav() {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Overview</SidebarGroupLabel>

			<SidebarGroupContent>
				<SidebarMenu>
					{navigationItems.map((item) => {
						const isActive =
							pathname === item.href ||
							(item.href === "/shared" && pathname.startsWith("/shared/"));

						return (
							<SidebarMenuItem key={item.href}>
								<SidebarMenuButton
									href={item.href}
									isActive={isActive}
									tooltip={item.title}
								>
									<item.icon />
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
