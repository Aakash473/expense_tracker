"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/shared/ui/toggle";

type ThemeToggleProps = {
	inSidebar?: boolean;
};

export default function ThemeToggle({ inSidebar = false }: ThemeToggleProps) {
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	return (
		<Toggle
			variant="outline"
			size="sm"
			isSelected={isDark}
			onChange={(selected) => setTheme(selected ? "dark" : "light")}
			aria-label="Toggle dark mode"
			className={
				inSidebar
					? "w-full justify-start group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
					: undefined
			}
		>
			{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
			{inSidebar && (
				<span className="group-data-[collapsible=icon]:hidden">Dark mode</span>
			)}
		</Toggle>
	);
}
