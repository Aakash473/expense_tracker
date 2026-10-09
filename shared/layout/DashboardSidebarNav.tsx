"use client";

import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users
} from "lucide-react";

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
];

export default function DashboardSidebarNav() {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;

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