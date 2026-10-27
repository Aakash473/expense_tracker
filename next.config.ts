import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	// Don't generate AGENTS.md / CLAUDE.md on `next dev`.
	agentRules: false,
};

export default nextConfig;
