'use client';

import { Button, cn, IconButton, Input } from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MobileHeaderProps {
  isAuthenticated: boolean;
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen(open: boolean): void;
}

export function MobileHeader({
  isAuthenticated,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
}: MobileHeaderProps): React.ReactElement {
  const router = useRouter();

  const handleLogin = (): void => {
    router.push('/login');
  };

  const handleMyPage = (): void => {
    router.push('/my');
  };

  return (
    <>
      <div className="block w-full md:hidden">
        <div
          className={cn(
            'flex w-full items-center justify-between',
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
            'flex w-full items-center justify-between',
            isMobileSearchOpen ? 'hidden' : 'flex'
          )}
        >
          <Link href="/">
            <Image src="/shared-assets/Logo.svg" alt="HiarcLogo" width={120} height={30} />
          </Link>
          <div className="flex items-center gap-2">
            <IconButton
              iconSrc="/shared-assets/ZoomIn.svg"
              aria-label="검색"
              onClick={() => setIsMobileSearchOpen(true)}
            />
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <IconButton
                  iconSrc="/shared-assets/User.svg"
                  aria-label="프로필"
                  onClick={handleMyPage}
                />
              </div>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleLogin}>
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>

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