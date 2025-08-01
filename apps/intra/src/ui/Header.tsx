'use client';

import { Button, cn, IconButton, Input } from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header(): React.ReactElement {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      <header className="flex w-full items-center justify-between border-b border-gray-200">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-10 py-4">
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
              <Image src="/Logo.svg" alt="HiarcLogo" width={120} height={30} />
            </Link>
            <div className="flex items-center gap-2">
              <IconButton
                iconSrc="/ZoomIn.svg"
                aria-label="검색"
                onClick={() => setIsMobileSearchOpen(true)}
              />
              <Button variant="secondary" size="sm">
                로그인
              </Button>
            </div>
          </div>

          <div className="hidden w-full items-center justify-between md:flex">
            <Link href="/">
              <Image src="/Logo.svg" alt="HiarcLogo" width={120} height={30} />
            </Link>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                variant="search"
                placeholder="Placeholder"
                className="h-[44px] w-[328px]"
              />
              <Button variant="secondary" size="sm">
                로그인
              </Button>
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
