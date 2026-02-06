/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // API routes configuration
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Enable standalone output for deployment
  output: 'standalone',
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Compression
  compress: true,
}

module.exports = nextConfig
