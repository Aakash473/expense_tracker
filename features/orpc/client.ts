import { createORPCClient } from "@orpc/client";
import type { RouterClient } from "@orpc/server";
import { RPCLink } from "@orpc/client/fetch";

import type { router } from "./router";

const link = new RPCLink({
    url: "/rpc",
    origin:
        typeof window === "undefined"
            ? "http://localhost:3000"
            : window.location.origin,
});

export const orpc: RouterClient<typeof router> =
    createORPCClient(link);