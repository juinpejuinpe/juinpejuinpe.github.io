import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so GitHub Pages can host the site with no server.
  output: "export",
  // Emit /posts/ + /posts/hello-world/ folder structure that GitHub Pages serves cleanly.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
