import { type } from "arktype";

export const createGroupSchema = type({
	name: type("string")
		.narrow(
			(value, ctx) =>
				value.trim().length > 0 ||
				ctx.reject({ message: "Group name cannot be empty" }),
		)
		.narrow(
			(value, ctx) =>
				value.trim().length <= 100 ||
				ctx.reject({ message: "Group name cannot exceed 100 characters" }),
		),
	"description?": type("string").narrow(
		(value, ctx) =>
			value.length <= 500 ||
			ctx.reject({ message: "Description cannot exceed 500 characters" }),
	),
});

export type CreateGroupInput = typeof createGroupSchema.inferIn;
