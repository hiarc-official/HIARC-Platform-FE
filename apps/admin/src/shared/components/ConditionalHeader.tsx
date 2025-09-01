'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MobileHeader, MenuItem } from '@hiarc-platform/ui';
import Header from './Header';

export default function ConditionalHeader(): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const isAnnouncementList = pathname === '/announcement';
  const isAnnouncementWrite = pathname.startsWith('/announcement/write');
  const isAnnouncementEdit = pathname.includes('/announcement/') && pathname.includes('/edit');

  const handleBackClick = (): void => {
    router.back();
  };

  const handleHomeClick = (): void => {
    router.push('/');
  };

  // 모바일 메뉴 아이템들
  const menuItems: MenuItem[] = [
    {
      label: '학회원 관리',
      path: '/manage',
    },
    {
      label: '공지사항',
      path: '/announcement',
    },
  ];

  // 모바일에서 공지사항 관련 페이지인 경우 MobileHeader 사용
  if (isAnnouncementList || isAnnouncementWrite || isAnnouncementEdit) {
    const getTitle = (): string => {
      if (isAnnouncementList) {
        return '공지사항';
      }
      if (isAnnouncementWrite) {
        return '공지사항 작성';
      }
      if (isAnnouncementEdit) {
        return '공지사항 수정';
      }
      return '공지사항';
    };

    const title = getTitle();

    return (
      <>
        {/* 모바일 전용 헤더 - 플로팅 */}
        <div className="fixed left-0 right-0 top-0 z-50 block md:hidden">
          <MobileHeader
            title={title}
            onBackClick={isAnnouncementList ? undefined : handleBackClick}
            onHomeClick={handleHomeClick}
            menuItems={isAnnouncementList ? menuItems : undefined}
          />
        </div>

        {/* 데스크톱에서는 기존 헤더 사용 */}
        <div className="hidden md:block">
          <Header />
        </div>
      </>
    );
  }

  // 다른 페이지에서는 기존 헤더 사용
  return <Header />;
}
