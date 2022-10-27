/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i2-prod.walesonline.co.uk']
  }
}

module.exports = nextConfig

// nextjs requires our paths to be declared before we can take things from cdn's