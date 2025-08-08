'use client';

import { Button, cn, IconButton, Input } from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth-store';

export default function Header(): React.ReactElement {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleLogin = (): void => {
    router.push('/login');
  };

  const handleMyPage = (): void => {
    router.push('/my');
  };

  const handleLogout = (): void => {};

  return (
    <>
      <header className="flex w-full items-center justify-between border-b border-gray-200">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4">
          <div
            className={cn(
              'flex w-full items-center justify-between md:hidden',
              isMobileSearchOpen ? 'block' : 'hidden'
            )}
          >
            <Input
              type="search"
              variant="search"
              placeholder="검색어를 입력하세요"
              className="mx-4 h-[44px] flex-1"
              autoFocus
            />
            <IconButton
              iconSrc="/Close.svg"
              aria-label="검색 닫기"
              onClick={() => setIsMobileSearchOpen(false)}
            />
          </div>

          <div
            className={cn(
              'flex w-full items-center justify-between md:hidden',
              isMobileSearchOpen ? 'hidden' : 'flex'
            )}
          >
            <Link href="/">
              <Image src="/shared-assets/Logo.svg" alt="HiarcLogo" width={120} height={30} />
            </Link>
            <div className="flex items-center gap-2">
              <IconButton
                iconSrc="/ZoomIn.svg"
                aria-label="검색"
                onClick={() => setIsMobileSearchOpen(true)}
              />
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={handleMyPage}>
                    마이페이지
                  </Button>
                  <IconButton
                    iconSrc="/shared-assets/User.svg"
                    aria-label="프로필"
                    onClick={handleLogout}
                  />
                </div>
              ) : (
                <Button variant="secondary" size="sm" onClick={handleLogin}>
                  로그인
                </Button>
              )}
            </div>
          </div>

          <div className="hidden w-full items-center justify-between md:flex">
            <Link href="/">
              <Image src="/shared-assets/Logo.svg" alt="HiarcLogo" width={120} height={30} />
            </Link>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                variant="search"
                placeholder="Placeholder"
                className="h-[44px] w-[328px]"
              />
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={handleMyPage}>
                    마이페이지
                  </Button>
                  <IconButton iconSrc="/User.svg" aria-label="프로필" onClick={handleLogout} />
                </div>
              ) : (
                <Button variant="secondary" size="sm" onClick={handleLogin}>
                  로그인
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-2">
                <Input variant="search" placeholder="검색어를 입력하세요" className="flex-1" />
                <IconButton
                  iconSrc="/Close.svg"
                  size="lg"
                  onClick={() => setIsMobileSearchOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
