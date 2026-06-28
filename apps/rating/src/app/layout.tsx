import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { GlobalDialogContainer } from '@hiarc-platform/design-system';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/shared/providers/providers';

// Pretendard — admin/intra와 동일한 패밀리룩
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';

import './globals.css';

export const metadata: Metadata = {
  title: 'Hi-Rating',
  description: 'HIARC Hiting Rating',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col">
        <Analytics />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <div className="hidden lg:block">
            <Footer />
          </div>
          <GlobalDialogContainer />
        </Providers>
      </body>
    </html>
  );
}
