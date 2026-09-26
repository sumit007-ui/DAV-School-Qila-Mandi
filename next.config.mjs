/** @type {import('next').NextConfig} */

// ── Content Security Policy ────────────────────────────────────────────────
const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://*.supabase.co https://cdn.sanity.io https://*.google-analytics.com https://*.googletagmanager.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.googleapis.com https://firebaseinstallations.googleapis.com https://*.sanity.io https://*.api.sanity.io;
  media-src 'self' https://*.supabase.co;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim()

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',

  // ── Core ──────────────────────────────────────────────────────────────────
  reactStrictMode: true,
  poweredByHeader: false, // Hide "X-Powered-By: Next.js"
  compress: true,          // Enable gzip/brotli on server responses
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ── Image Optimization ───────────────────────────────────────────────────
  images: {
    // Next.js built-in image optimizer — auto WebP/AVIF serving
    formats: ['image/avif', 'image/webp'],
    // Aggressive caching: 30 days TTL for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Allow images from Supabase, Unsplash, and Sanity
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false, // Block SVG optimization (security)
    contentDispositionType: 'attachment',
  },

  // ── Security & Cache Headers ─────────────────────────────────────────────
  async headers() {
    return [
      // ─ All pages: strict security headers ─────────────────────────────
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
        ],
      },

      // ─ Static assets: aggressive long-term caching ─────────────────────
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // ─ Next.js image optimization output ───────────────────────────────
      {
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
          { key: 'Vary', value: 'Accept' },
        ],
      },

      // ─ Fonts ───────────────────────────────────────────────────────────
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },

      // ─ Local images (public/images/*) ──────────────────────────────────
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=3600' },
        ],
      },

      // ─ Public API routes (read-only data) ──────────────────────────────
      {
        source: '/api/(photos|news|toppers|settings)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=30' },
          { key: 'Vary', value: 'Accept-Encoding' },
        ],
      },

      // ─ Admin API routes: no caching, extra isolation ─────────────────
      {
        source: '/api/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
        ],
      },
    ]
  },

  // ── Webpack performance tweaks ────────────────────────────────────────────
  webpack(config, { dev, isServer }) {
    // Smaller production bundles
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          maxSize: 244_000,
        },
      }
    }
    return config
  },
}

export default nextConfig
