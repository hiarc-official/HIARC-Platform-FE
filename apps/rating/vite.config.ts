import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// 도메인용 로컬 인증서 경로 (mkcert로 생성한 파일명과 정확히 일치해야 함)
const certDir = path.resolve(__dirname, './certificates');
const certFile = 'local.test.hiarc-official.com.pem';
const keyFile = 'local.test.hiarc-official.com-key.pem';
const certPath = path.join(certDir, certFile);
const keyPath = path.join(certDir, keyFile);
const hasCert = fs.existsSync(certPath) && fs.existsSync(keyPath);
const httpsOption = hasCert
  ? {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
  : undefined;

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'local.test.hiarc-official.com',
    port: 3000,
    // Vite 6: https는 boolean이 아니라 ServerOptions. 조건부로만 포함
    ...(httpsOption ? { https: httpsOption } : {}),
    hmr: {
      protocol: 'wss',
      host: 'local.test.hiarc-official.com',
      port: 3000,
    },
    strictPort: true,
  },
});
