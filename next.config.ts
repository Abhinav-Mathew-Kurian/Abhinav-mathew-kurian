import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project screenshots are admin-curated (entered via the private
    // /admin dashboard, not user-submitted), so any https host is
    // trusted here — covers Vercel Blob, Cloudinary, GitHub, etc.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
