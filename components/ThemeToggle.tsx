"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <Toggle
            variant="outline"
            size="sm"
            isSelected={isDark}
            onChange={(selected) => {
                setTheme(selected ? "dark" : "light");
            }}
            aria-label="Toggle dark mode"
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Toggle>
    );
}