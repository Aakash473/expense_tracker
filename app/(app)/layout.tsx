import type { ReactNode } from "react"

import DashboardSidebar from "@/shared/layout/DashboardSidebar"
import DashboardHeader from "@/shared/layout/DashboardHeader"
import {
    SidebarInset,
    SidebarProvider,
} from "@/shared/ui/sidebar"

export default function AppLayout({
                                      children,
                                  }: {
    children: ReactNode
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset className="min-w-0">
                <main className="min-h-screen min-w-0 bg-background text-foreground">
                    <DashboardHeader />

                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>

    )
}