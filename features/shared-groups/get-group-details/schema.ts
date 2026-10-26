import { type } from "arktype";

export const getGroupDetailsSchema = type({
	groupId: "string.uuid",
});

export type GetGroupDetailsInput = typeof getGroupDetailsSchema.inferIn;
