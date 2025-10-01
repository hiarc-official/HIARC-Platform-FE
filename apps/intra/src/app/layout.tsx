import Footer from '@/shared/components/ui/Footer';
import ConditionalHeader from '@/shared/components/ui/ConditionalHeader';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Pretendard 폰트는 globals.css에서 로컬 폰트로 처리하므로 제거

import { Providers } from '../shared/providers/providers';
import './globals.css';
import { GlobalDialogContainer } from '@hiarc-platform/ui';

export const metadata: Metadata = {
  title: 'HI-ARC',
  description: 'HIARC Intra',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  // 개발 환경에서는 Vercel Analytics 비활성화 (CSP 충돌 방지)
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          {!isDev && <Analytics />}
          {!isDev && <SpeedInsights />}
          <ConditionalHeader />
          <main className="flex-1">{children}</main>
          <div className="hidden md:block">
            <Footer />
          </div>
          <GlobalDialogContainer />
        </Providers>
      </body>
    </html>
  );
}
