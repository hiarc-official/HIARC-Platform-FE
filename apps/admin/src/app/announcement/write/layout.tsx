'use client';

import { useRouter } from 'next/navigation';
import { BackButton, Divider, Title } from '@hiarc-platform/ui';

export default function AnnouncementWriteLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleBackClick = (): void => {
    router.back();
  };

  return (
    <>
      {/* 데스크톱용 추가 헤더 (기존 Header 아래에 표시) */}
      <div className="hidden md:block">
        <div className="flex w-full flex-col items-center gap-3 px-4 pt-3">
          <BackButton onClick={handleBackClick} />
          <div className="flex w-full items-center justify-between">
            <Title size="sm" weight="bold">
              공지사항 작성
            </Title>
          </div>
          <Divider variant="horizontal" size="full" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div>{children}</div>
    </>
  );
}
