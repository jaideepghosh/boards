/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/boards" : "",
  output: "export",
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    NEXT_PUBLIC_APPWRITE_PROJECT_NAME:
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME || "default",
  },
  // Optional: To ensure correct handling of the basePath in the static export
  assetPrefix: process.env.NODE_ENV === "production" ? "/boards/" : "",
};

export default nextConfig;
