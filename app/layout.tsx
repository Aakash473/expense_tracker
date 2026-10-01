import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/shared/ui/ui/sonner";

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses easily.",
};

export default function RootLayout({
                                     children,
                                   }: LayoutProps<"/">) {
  return (
      <html
          lang="en"
          suppressHydrationWarning
          className={cn(
              "h-full",
              geistSans.variable,
              geistMono.variable,
              jetbrainsMonoHeading.variable
          )}
      >
      <body className="min-h-full flex flex-col antialiased">
      <ThemeProvider>
        {children}
          <Toaster />
      </ThemeProvider>
      </body>
      </html>
  );
}