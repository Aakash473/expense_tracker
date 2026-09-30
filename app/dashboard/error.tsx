"use client";

import { Button } from "@/components/ui/button";

export default function Error({
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="font-heading text-2xl font-semibold">
                    Something went wrong!
                </h2>

                <p className="text-muted-foreground">
                    We could not load your dashboard.
                </p>

                <Button onClick={() => reset()}>
                    Try again
                </Button>
            </div>
        </main>
    );
}