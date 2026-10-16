import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";

import type { router } from "./router";

const link = new RPCLink({
	url:
		typeof window === "undefined"
			? "http://localhost:3000/rpc"
			: `${window.location.origin}/rpc`,
});

export const client: RouterClient<typeof router> = createORPCClient(link);
