import type { ReactNode } from "react";

import { SidebarTrigger } from "@/shared/ui/sidebar";

type PageHeaderProps = {
	title: string;
	actions?: ReactNode;
};

export default function PageHeader({ title, actions }: PageHeaderProps) {
	return (
		<header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex min-h-14 items-center justify-between gap-3">
					<div className="flex min-w-0 items-center gap-3">
						<SidebarTrigger />
						<h1 className="truncate font-mono text-xl font-semibold tracking-tight sm:text-2xl">
							{title}
						</h1>
					</div>

					{actions && (
						<div className="flex shrink-0 items-center gap-2">{actions}</div>
					)}
				</div>
			</div>
		</header>
	);
}
