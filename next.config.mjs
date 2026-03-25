/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Set NEXT_PUBLIC_BASE_PATH to your repo name when deploying to GitHub Pages
  // e.g. /fastnlp for https://<user>.github.io/fastnlp
  // Leave empty (or unset) for a custom domain or user/org site
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
