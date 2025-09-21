import Footer from '@/shared/components/ui/Footer';
import ConditionalHeader from '@/shared/components/ui/ConditionalHeader';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// 로컬 폰트 import
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';

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
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Analytics />
          <SpeedInsights />
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
