// apps/admin/next.config.mjs
import fs from 'fs';
import path from 'path';

// 빌드 시 한 번 디렉토리 생성
function ensureSharedAssetsDir() {
  const dir = path.join(process.cwd(), '.vercel', 'output', 'static', 'shared-assets');
  fs.mkdirSync(dir, { recursive: true });
}

const nextConfig = {
  transpilePackages: ['@hiarc-platform/ui', '@hiarc-platform/util'],

  webpack: (config) => {
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

export default nextConfig;
