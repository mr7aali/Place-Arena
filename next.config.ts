import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "place-arena-backend.vercel.app",
      "images.unsplash.com",
      "i.ibb.co",
      "i.imgur.com",
      "cdn.pixabay.com",
      "images.pexels.com",
      "example.com",
      "readdy.ai",
      "res.cloudinary.com",
    ],
  },
  experimental: { optimizeCss: false },
};

export default nextConfig;
