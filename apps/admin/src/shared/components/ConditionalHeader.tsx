'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MobileHeader, MenuItem, DialogUtil } from '@hiarc-platform/ui';
import Header from './Header';
import { useAuthStore } from '../stores/auth-store';
import { useLogout } from '@/features/auth';

export default function ConditionalHeader(): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogout();

  const { isAuthenticated } = useAuthStore();
  const isAnnouncementList = pathname === '/announcement';
  const isAnnouncementWrite = pathname.startsWith('/announcement/write');
  const isAnnouncementEdit = pathname.includes('/announcement/') && pathname.includes('/edit');
  const isAnnouncementDetail =
    pathname.includes('/announcement/') &&
    !pathname.includes('/edit') &&
    !pathname.includes('/write') &&
    pathname !== '/announcement';

  const isStudyDetail = pathname.includes('/study/');
  const isStudyWrite = pathname === '/study/create';
  const isStudyEdit = pathname.includes('/study/') && pathname.includes('/edit');

  const isMain =
    pathname === '/announcement' ||
    pathname === '/manage' ||
    pathname === '/study' ||
    pathname === '/award' ||
    pathname === '/admin' ||
    pathname === '/login' ||
    pathname === '/';

  const handleBackClick = (): void => {
    router.back();
  };

  const handleLogout = (): void => {
    DialogUtil.showConfirm(
      '정말 로그아웃하시겠습니까?',
      () => {
        logoutMutation.mutate();
      },
      undefined,
      {
        title: '로그아웃',
        confirmText: '로그아웃',
        cancelText: '취소',
      }
    );
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
    {
      label: '스터디',
      path: '/study',
    },
    {
      label: '대회',
      path: '/award',
    },
    {
      label: '운영진',
      path: '/admin',
    },
    {
      label: '하이팅',
      path: process.env.NEXT_PUBLIC_RATING_ADMIN_URL ?? '/rating',
    },
  ];

  // 모바일에서 공지사항 관련 페이지인 경우 MobileHeader 사용
  if (
    isAnnouncementList ||
    isAnnouncementWrite ||
    isAnnouncementEdit ||
    isAnnouncementDetail ||
    isStudyDetail ||
    isStudyWrite ||
    isStudyEdit ||
    isMain
  ) {
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
      if (isAnnouncementDetail) {
        return '공지사항';
      }
      if (isStudyDetail) {
        return '스터디 상세';
      }
      if (isStudyWrite) {
        return '스터디 작성';
      }
      if (isStudyEdit) {
        return '스터디 수정';
      }
      return '공지사항';
    };

    const title = getTitle();

    return (
      <>
        {/* 모바일 전용 헤더 - 플로팅 */}
        <div className="fixed left-0 right-0 top-0 z-50 block md:hidden">
          <MobileHeader
            isMain={isMain}
            title={title}
            onLoginClick={() => router.push('/login')}
            onLogoutClick={handleLogout}
            onBackClick={handleBackClick}
            menuItems={menuItems}
            menuAlignment="right"
            isAuthenticated={isAuthenticated}
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
