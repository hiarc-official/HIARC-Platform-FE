// apps/rating/next.config.mjs
import path from 'node:path';

const workspaceRoot = path.join(import.meta.dirname, '../..');

const nextConfig = {
  transpilePackages: ['@hiarc-platform/design-system', '@hiarc-platform/domain', '@hiarc-platform/shared'],

  // 홈 디렉터리의 떠돌이 lockfile을 워크스페이스 루트로 오인하지 않도록 명시
  outputFileTracingRoot: workspaceRoot,
  turbopack: { root: workspaceRoot },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 배럴 임포트를 직접 임포트로 변환해 트리쉐이킹 강화
  experimental: {
    optimizePackageImports: ['@hiarc-platform/design-system', '@hiarc-platform/domain', '@hiarc-platform/shared'],
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
