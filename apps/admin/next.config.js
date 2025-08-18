import fs from 'fs';
import path from 'path';

function ensureSharedAssetsDir() {
  const dir = path.join(process.cwd(), '.vercel', 'output', 'static', 'shared-assets');
  fs.mkdirSync(dir, { recursive: true });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hiarc-platform/ui', '@hiarc-platform/util'],
  webpack: (config, { isServer }) => {
    // 서버/클라이언트 상관없이 빌드 단계에서 한 번 실행
    ensureSharedAssetsDir();
    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' http://test.hiarc-official.com https://test.hiarc-official.com https://*.hiarc-official.com http://localhost:* https://localhost:*",
              "frame-ancestors 'none'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
