import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/shared/providers/providers';
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
      <body>
        <Analytics />
        <Providers>
          <div className="mx-auto flex min-h-screen w-[1000px] flex-col items-center justify-between max-[480px]:w-[375px]">
            <Header />
            <div className="w-full flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
