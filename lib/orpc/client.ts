import { createORPCClient, ORPCError, onError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";

import type { router } from "./router";

const link = new RPCLink({
	url:
		typeof window === "undefined"
			? "http://localhost:3000/rpc"
			: `${window.location.origin}/rpc`,

	interceptors: [
		onError((error) => {
			if (typeof window === "undefined") {
				return;
			}

			const isUnauthorized =
				error instanceof ORPCError && error.code === "UNAUTHORIZED";

			const cause = error instanceof Error ? error.cause : undefined;

			const isUnauthorizedResponse =
				cause !== undefined &&
				typeof cause === "object" &&
				cause !== null &&
				"response" in cause &&
				cause.response instanceof Response &&
				cause.response.status === 401;

			if (
				(isUnauthorized || isUnauthorizedResponse) &&
				window.location.pathname !== "/login"
			) {
				window.location.assign("/login");
			}
		}),
	],
});

export const client: RouterClient<typeof router> = createORPCClient(link);
