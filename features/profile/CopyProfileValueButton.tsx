"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";

type CopyProfileValueButtonProps = {
	value: string;
	label: string;
};

export default function CopyProfileValueButton({
	value,
	label,
}: CopyProfileValueButtonProps) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			toast.success(`${label} copied to clipboard`);

			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error(`Failed to copy ${label.toLowerCase()}`);
		}
	}

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			onClick={handleCopy}
			aria-label={`Copy ${label}`}
		>
			{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
		</Button>
	);
}
