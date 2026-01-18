/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: [],
  },
  experimental: {
    typedRoutes: false,
  },
};

module.exports = nextConfig;
