"use client";

import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { orpc } from "@/lib/orpc/query";
import { Button } from "@/shared/ui/button";
import {
	Dialog,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

export default function CreateGroupDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const createGroupMutation = useMutation(
		orpc.sharedGroups.create.mutationOptions({
			onSuccess: () => {
				toast.success("Group created successfully");
				setName("");
				setDescription("");
				setIsOpen(false);
			},
			onError: (error) => {
				toast.error(error.message || "Failed to create group.");
			},
		}),
	);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		createGroupMutation.mutate({
			name,
			...(description.trim() ? { description: description.trim() } : {}),
		});
	}

	return (
		<DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
			<Button type="button" size="sm">
				<Plus className="h-4 w-4" />
			</Button>

			<Dialog className="sm:max-w-md">
				<DialogTitle>Shared Group</DialogTitle>

				<DialogDescription>
					Create a group to manage expenses with other people.
				</DialogDescription>

				<form onSubmit={handleSubmit} className="mt-4 space-y-4">
					<div className="space-y-2">
						<Label htmlFor="group-name">Name</Label>
						<Input
							id="group-name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="e.g. Trip to Goa"
							maxLength={100}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="group-description">
							Description{" "}
							<span className="text-muted-foreground">(optional)</span>
						</Label>
						<Textarea
							id="group-description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							placeholder="What is this group for?"
							maxLength={500}
							rows={4}
						/>
					</div>

					<div className="flex justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							onPress={() => setIsOpen(false)}
							isDisabled={createGroupMutation.isPending}
						>
							Cancel
						</Button>

						<Button type="submit" isDisabled={createGroupMutation.isPending}>
							{createGroupMutation.isPending ? "Creating..." : "Create group"}
						</Button>
					</div>
				</form>
			</Dialog>
		</DialogTrigger>
	);
}
