import { os } from "@orpc/server";
import { type } from "arktype";

const helloInput = type({
    name: "string > 0",
});

export const hello = os
    .input(helloInput)
    .handler(async ({ input }) => {
        return {
            message: `Hello, ${input.name}!`,
        };
    });