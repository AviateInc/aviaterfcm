import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "/aviaterfcm";

const nextConfig: NextConfig = {
    experimental: {
        agentFeedback: true,
    },
    cacheComponents: !isGitHubPages,
    partialPrefetching: !isGitHubPages,
    ...(isGitHubPages
        ? {
              output: "export",
              basePath: pagesBasePath,
              trailingSlash: true,
              images: { unoptimized: true },
          }
        : {}),
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
