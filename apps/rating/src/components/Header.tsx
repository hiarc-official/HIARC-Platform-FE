'use client';

import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogUtil,
} from '@hiarc-platform/design-system';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '@/hooks/use-me';
import { authApi } from '@/api/AuthApi';
import { getId } from '@/api/AdminApi';

const INTRA_URL = 'https://intra.hiarc-official.com';
const ICON_BTN_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100';

// 상세(서브) 페이지 — 모바일에서 뒤로가기 헤더를 보여준다.
const DETAIL_TITLES: Record<string, string> = {
  '/div': '랭킹',
  '/streak': '스트릭',
  '/search': '검색',
  '/admin': '관리자',
  '/test': '테스트',
};

const Header = (): React.ReactElement => {
  const { isAuthenticated, me } = useMe();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [showError, setShowError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const detailTitle = DETAIL_TITLES[pathname];
  const isDetail = Boolean(detailTitle);

  const handleSearch = async (): Promise<void> => {
    const handle = searchInput.trim();
    if (!handle) {
      return;
    }
    setIsFetching(true);
    try {
      const res = await getId(handle);
      const data = res?.data as { id?: number; memberId?: number } | undefined;
      const memberId = data?.id ?? data?.memberId;
      if (memberId) {
        window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
        setSearchInput('');
        setSearchOpen(false);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('핸들 검색 실패:', error);
      setShowError(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogin = (): void => {
    window.location.href = `${INTRA_URL}/login`;
  };

  const goMyPage = (): void => {
    window.location.href = `${INTRA_URL}/my`;
  };

  const handleLogout = (): void => {
    DialogUtil.showConfirm(
      '정말 로그아웃하시겠습니까?',
      async () => {
        try {
          await authApi.LOGOUT();
        } catch (error) {
          console.error('로그아웃 실패:', error);
        }
        queryClient.removeQueries({ queryKey: ['auth', 'me'] });
        window.location.href = '/';
      },
      undefined,
      { title: '로그아웃', confirmText: '로그아웃', cancelText: '취소' }
    );
  };

  // 데스크탑 인라인 검색창
  const searchBox = (
    <Input
      type="search"
      variant="search"
      placeholder={isAuthenticated ? 'BOJ 핸들명을 입력하세요' : '로그인 후 검색 가능합니다'}
      className="h-[44px] w-[328px]"
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && isAuthenticated) {
          handleSearch();
        }
      }}
      disabled={!isAuthenticated || isFetching}
    />
  );

  // 마이페이지 아이콘 버튼 (intra와 동일하게 User 아이콘)
  const myPageButton = (
    <button type="button" aria-label="마이페이지" onClick={goMyPage} className={ICON_BTN_CLASS}>
      <Image src="/shared-assets/User.svg" alt="마이페이지" width={22} height={22} />
    </button>
  );

  // 데스크탑 우측 인증 영역
  const desktopAuth = isAuthenticated ? (
    <div className="flex items-center gap-2">
      {me?.bojHandle && (
        <Label size="sm" weight="medium" className="mr-1 text-gray-700">
          {me.bojHandle}
        </Label>
      )}
      {myPageButton}
      <Button variant="secondary" size="sm" onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  ) : (
    <Button variant="secondary" size="sm" onClick={handleLogin}>
      로그인
    </Button>
  );

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-4">
        {/* 데스크탑 */}
        <div className="hidden w-full items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <Link href="/" className="rounded-lg p-2 transition-colors hover:bg-gray-100">
              <Image
                src="/shared-assets/Logo.svg"
                alt="HI-ARC"
                width={120}
                height={30}
                draggable={false}
                className="select-none"
              />
            </Link>
            <nav className="flex items-center gap-4">
              <a href={`${INTRA_URL}/announcement`} className="text-gray-200 transition-colors hover:text-gray-700">
                <Label size="lg" weight="bold" className="cursor-pointer">
                  공지사항
                </Label>
              </a>
              <a href={`${INTRA_URL}/study`} className="text-gray-200 transition-colors hover:text-gray-700">
                <Label size="lg" weight="bold" className="cursor-pointer">
                  스터디
                </Label>
              </a>
              <Link href="/" className="text-gray-900">
                <Label size="lg" weight="bold" className="cursor-pointer">
                  하이팅
                </Label>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            {searchBox}
            {desktopAuth}
          </div>
        </div>

        {/* 모바일 (태블릿 이하) */}
        <div className="lg:hidden">
          {isDetail ? (
            // 상세 페이지: 뒤로가기 + 타이틀 + 홈 (intra 참고)
            <div className="flex w-full items-center">
              <button type="button" aria-label="뒤로가기" onClick={() => router.back()} className={ICON_BTN_CLASS}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </button>
              <span className="flex-1 text-center text-lg font-bold text-gray-900">
                {detailTitle}
              </span>
              <button type="button" aria-label="메인으로" onClick={() => router.push('/')} className={ICON_BTN_CLASS}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              </button>
            </div>
          ) : (
            // 메인 페이지: 로고 + 검색/마이페이지/메뉴/로그인
            <div className="flex w-full flex-col gap-3">
              <div className="flex w-full items-center justify-between">
                <Link href="/">
                  <Image
                    src="/shared-assets/Logo.svg"
                    alt="HI-ARC"
                    width={100}
                    height={25}
                    draggable={false}
                    className="select-none"
                  />
                </Link>
                <div className="flex items-center gap-2">
                  {isAuthenticated && (
                    <button type="button" aria-label="검색" onClick={() => setSearchOpen(true)} className={ICON_BTN_CLASS}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </button>
                  )}
                  {isAuthenticated && myPageButton}
                  <button
                    type="button"
                    aria-label={menuOpen ? '메뉴 닫기' : '메뉴'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className={ICON_BTN_CLASS}
                  >
                    {menuOpen ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                      </svg>
                    )}
                  </button>
                  {!isAuthenticated && (
                    <Button variant="secondary" size="sm" onClick={handleLogin}>
                      로그인
                    </Button>
                  )}
                </div>
              </div>

              {menuOpen && (
                <nav className="flex flex-col border-t border-gray-100 pt-2">
                  <a href={`${INTRA_URL}/announcement`} className="rounded-md px-2 py-2.5 hover:bg-gray-50">
                    <Label weight="bold" selectable={false} className="cursor-pointer text-gray-700">
                      공지사항
                    </Label>
                  </a>
                  <a href={`${INTRA_URL}/study`} className="rounded-md px-2 py-2.5 hover:bg-gray-50">
                    <Label weight="bold" selectable={false} className="cursor-pointer text-gray-700">
                      스터디
                    </Label>
                  </a>
                  <Link href="/" className="rounded-md px-2 py-2.5 hover:bg-gray-50">
                    <Label weight="bold" selectable={false} className="cursor-pointer text-gray-900">
                      하이팅
                    </Label>
                  </Link>

                  {isAuthenticated && (
                    <>
                      <div className="my-1 border-t border-gray-100" />
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          handleLogout();
                        }}
                        className="rounded-md px-2 py-2.5 text-left hover:bg-gray-50"
                      >
                        <Label weight="bold" selectable={false} className="cursor-pointer text-gray-700">
                          로그아웃
                        </Label>
                      </button>
                    </>
                  )}
                </nav>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 모바일 검색 오버레이 */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3">
            <Input
              type="search"
              variant="search"
              placeholder="BOJ 핸들명을 입력하세요"
              className="h-[44px] flex-1 text-base"
              autoFocus
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
              disabled={isFetching}
            />
            <button type="button" aria-label="검색 닫기" onClick={() => setSearchOpen(false)} className={ICON_BTN_CLASS}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>검색 실패</DialogTitle>
            <DialogDescription>해당 BOJ 핸들명을 가진 회원을 찾을 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowError(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
