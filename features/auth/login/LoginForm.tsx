"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/supabase/client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/ui/card";
import { Input } from "@/shared/ui/ui/input";
import { Label } from "@/shared/ui/ui/label";
import { Button } from "@/shared/ui/ui/button";

export default function LoginForm() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="font-heading text-2xl">
                    Welcome back
                </CardTitle>

                <CardDescription>
                    Sign in to continue to your Expense Tracker.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        isDisabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}