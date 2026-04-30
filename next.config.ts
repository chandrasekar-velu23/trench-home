import type { NextConfig } from "next";
import os from "os";

// Collect all local network IPs for allowedDevOrigins
function getLocalIPs(): string[] {
  const nets = os.networkInterfaces();
  const ips: string[] = [];
  for (const iface of Object.values(nets)) {
    for (const addr of iface ?? []) {
      if (addr.family === "IPv4" && !addr.internal) {
        ips.push(addr.address);
      }
    }
  }
  return ips;
}

const nextConfig: NextConfig = {
  // ── Development: allow LAN access without cross-origin warnings ──
  allowedDevOrigins: getLocalIPs(),

  // ── Images: allow no external domains (all logos are local) ──
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    // Enable image optimization (set to false to use Next.js internal optimizer)
    unoptimized: false,
  },

  // ── Security headers for production ──
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Cache static integration logos aggressively
      {
        source: "/integrations/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Production: strip console logs ──
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
