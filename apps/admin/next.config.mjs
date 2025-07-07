import path from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('./src');
    config.resolve.alias['@core'] = path.resolve('../../packages/core/src');
    return config;
  },
};

export default nextConfig;