/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to prevent double mounting in development
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  }
};

module.exports = nextConfig;