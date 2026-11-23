import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "C:\\Users\\ASUS\\OneDrive\\Desktop\\hospital-web\\frontend",
  },
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/privacy-policy", destination: "/privacy-policy-2", permanent: true },
      { source: "/news-old", destination: "/news", permanent: true },
      { source: "/new", destination: "/", permanent: true },
      { source: "/new/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
