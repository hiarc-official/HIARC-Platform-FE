/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hiarc-platform/ui', '@hiarc-platform/shared'],
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },

  experimental: {
    optimizeCss: true
  },

  webpack: (config, { isServer }) => {
    // CSS 최적화
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          styles: {
            name: 'styles',
            test: /\.(css|scss|sass)$/,
            chunks: 'all',
            enforce: true,
          },
          datepicker: {
            name: 'datepicker',
            test: /react-datepicker/,
            chunks: 'all',
            priority: 20,
          },
        },
      };
    }
    return config;
  },
  async headers() {
    // 개발 환경에서는 더 관대한 CSP 적용
    const isDev = process.env.NODE_ENV === 'development';
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: isDev 
              ? [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-scripts.com https://*.vercel.com",
                  "style-src 'self' 'unsafe-inline' https:",
                  "img-src 'self' data: https: blob:",
                  "font-src 'self' data: https:",
                  "connect-src 'self' https://test.hiarc-official.com https://*.hiarc-official.com https://vitals.vercel-analytics.com https://vitals.vercel-insights.com https://*.vercel.com http://localhost:* https://localhost:* ws://localhost:* wss://localhost:*",
                  "frame-ancestors 'none'",
                  "form-action 'self'"
                ].join('; ')
              : [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
                  "style-src 'self' 'unsafe-inline'",
                  "img-src 'self' data: https:",
                  "font-src 'self' data:",
                  "connect-src 'self' https://test.hiarc-official.com https://*.hiarc-official.com https://vitals.vercel-analytics.com https://vitals.vercel-insights.com http://localhost:* https://localhost:*",
                  "frame-ancestors 'none'",
                  "form-action 'self'"
                ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
