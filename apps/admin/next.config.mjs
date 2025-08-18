// apps/admin/next.config.mjs
import fs from 'fs';
import path from 'path';

// 빌드 시 한 번 디렉토리 생성
function ensureSharedAssetsDir() {
  try {
    const dir = path.join(process.cwd(), '.vercel', 'output', 'static', 'shared-assets');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (error) {
    console.warn('Could not create shared-assets directory:', error.message);
  }
}

const nextConfig = {
  transpilePackages: ['@hiarc-platform/ui', '@hiarc-platform/util'],
  
  // public 디렉토리의 파일들이 정적 에셋으로 올바르게 복사되도록 설정
  assetPrefix: '',
  
  webpack: (config, { isServer }) => {
    // 서버 사이드에서만 디렉토리 생성 시도
    if (isServer) {
      ensureSharedAssetsDir();
    }
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
