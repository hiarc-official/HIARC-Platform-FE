// next.config.mjs

const dev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: dev,
    domains: dev
      ? ['placehold.co', 'localhost', 'picsum.photos']
      : ['my-production-domain.com'],
  },
};

export default nextConfig;