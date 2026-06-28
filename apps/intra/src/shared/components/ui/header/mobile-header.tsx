'use client';

import { Button, cn, IconButton, Input, Label, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@hiarc-platform/design-system';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { AuthenticatedMobileSection } from './authenticated-mobile-section';
import { myApi } from '@/features/member/api/member';

interface MobileHeaderProps {
  isAuthenticated: boolean;
  searchInput: string;
  setSearchInput(value: string): void;
}

const RATING_URL = 'https://rating.hiarc-official.com';

export function MobileHeader({
  isAuthenticated,
  searchInput,
  setSearchInput,
}: MobileHeaderProps): React.ReactElement {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isFetching, setIsFetching] = useState(false);

  const handleLogin = (): void => {
    router.push('/login');
  };

  const isActive = (path: string): boolean => pathname.startsWith(`/${path}`);

  const handleSearch = async (handle: string): Promise<void> => {
    if (!handle.trim()) {
      return;
    }

    setShowError(false);

    setIsFetching(true);

    try {
      const memberId = await myApi.GET_MEMBER_ID_BY_HANDLE(handle);
      if (memberId) {
        router.push(`/member/${memberId}`);
        setIsMobileSearchOpen(false);
        setSearchInput('');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Error fetching member ID:', error);
      setShowError(true);
    } finally {
      setIsFetching(false);
    }
  };

  const closeError = (): void => {
    setShowError(false);
  };

  return (
    <>
      <div className="block w-full lg:hidden">
        <div
          className={cn(
            'flex w-full items-center justify-between',
            isMobileSearchOpen ? 'block' : 'hidden'
          )}
        >
          <Input
            type="search"
            variant="search"
            placeholder={isAuthenticated ? 'BOJ 핸들명을 입력하세요' : '로그인 후 검색 가능합니다'}
            className="mx-4 h-[44px] flex-1 text-base"
            autoFocus
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && isAuthenticated) {
                handleSearch(searchInput);
              }
            }}
            disabled={!isAuthenticated || isFetching}
          />
          <IconButton
            iconSrc="/shared-assets/Close.svg"
            aria-label="검색 닫기"
            onClick={() => setIsMobileSearchOpen(false)}
          />
        </div>

        <div
          className={cn(
            'flex w-full items-center justify-between',
            isMobileSearchOpen ? 'hidden' : 'flex'
          )}
        >
          <Link href="/">
            <Image src="/shared-assets/Logo.svg" alt="HiarcLogo" width={86} height={21} />
          </Link>
          <div className="flex items-center gap-2">
            <IconButton
              size="lg"
              iconSrc={isMenuOpen ? '/shared-assets/Close.svg' : '/shared-assets/Hamburger.svg'}
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴'}
              onClick={() => setIsMenuOpen((open) => !open)}
            />

            {isAuthenticated && (
              <IconButton
                size="lg"
                iconSrc="/shared-assets/ZoomIn.svg"
                aria-label="검색"
                onClick={() => setIsMobileSearchOpen(true)}
              />
            )}

            {isAuthenticated ? (
              <AuthenticatedMobileSection />
            ) : (
              <Button variant="line_secondary" size="xs" onClick={handleLogin}>
                로그인
              </Button>
            )}
          </div>
        </div>

        {!isMobileSearchOpen && isMenuOpen && (
          <nav className="mt-2 flex flex-col border-t border-gray-200 pt-2">
            <Link
              href="/announcement"
              className="rounded-md px-2 py-2.5 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Label
                weight="bold"
                selectable={false}
                className={cn(
                  'cursor-pointer',
                  isActive('announcement') ? 'text-gray-900' : 'text-gray-700'
                )}
              >
                공지사항
              </Label>
            </Link>
            <Link
              href="/study"
              className="rounded-md px-2 py-2.5 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Label
                weight="bold"
                selectable={false}
                className={cn('cursor-pointer', isActive('study') ? 'text-gray-900' : 'text-gray-700')}
              >
                스터디
              </Label>
            </Link>
            <a
              href={RATING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-2 py-2.5 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Label weight="bold" selectable={false} className="cursor-pointer text-gray-700">
                하이팅
              </Label>
            </a>
          </nav>
        )}
      </div>

      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-2">
                <Input
                  variant="search"
                  placeholder={
                    isAuthenticated ? 'BOJ 핸들명을 입력하세요' : '로그인 후 검색 가능합니다'
                  }
                  className="flex-1 text-base"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && isAuthenticated) {
                      handleSearch(searchInput);
                    }
                  }}
                  disabled={!isAuthenticated || isFetching}
                />
                <IconButton
                  iconSrc="/shared-assets/Close.svg"
                  size="lg"
                  onClick={() => setIsMobileSearchOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showError} onOpenChange={closeError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>검색 실패</DialogTitle>
            <DialogDescription>해당 BOJ 핸들명을 가진 회원을 찾을 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeError}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
