/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i2-prod.walesonline.co.uk',
      'lh3.googleusercontent.com'
    ]
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: isProd ? 'max-age=0' : 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Connection',
            value: 'keep-alive',
          },
          // Add other headers as necessary to align with your dev environment
          {
            key: 'Host',
            value: isProd ? 'tiktok-t43v.onrender.com' : 'localhost:3000',
          },
        ],
      },
    ];
  },
  // Add any other production-specific settings if necessary
};

export default nextConfig;