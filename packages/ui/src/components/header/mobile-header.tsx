'use client';

import React, { useState } from 'react';
import { IconButton } from '../icon-button';
import { Title } from '../label/title';
import { MobileMenu } from './mobile-menu';
import { Button } from '../button';
import Image from 'next/image';

export interface MenuItem {
  label: string;
  path: string;
  icon?: string;
}

interface MobileHeaderProps {
  title: string;
  onBackClick?(): void;
  onHomeClick?(): void;
  menuItems?: MenuItem[];
  menuAlignment?: 'left' | 'right';
  isMain?: boolean;
  onLoginClick?(): void;
  onLogoutClick?(): void;
  isAuthenticated?: boolean;
  headerComponent?: React.ReactNode;
}

export function MobileHeader({
  title,
  onBackClick,
  onHomeClick,
  menuItems = [],
  menuAlignment = 'left',
  isMain = false,
  onLoginClick,
  onLogoutClick,
  isAuthenticated,
  headerComponent,
}: MobileHeaderProps): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  // 외부에서 주입받은 인증 상태 사용 또는 쿠키에서 확인 (fallback)
  const isLoggedIn = (): boolean => {
    if (isAuthenticated !== undefined) {
      return isAuthenticated;
    }

    if (typeof document === 'undefined') {
      return false;
    }

    // 환경 변수에서 쿠키 키 가져오기
    const cookieKey = process.env.NEXT_PUBLIC_AUTH_COOKIE_KEY || 'access';

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieKey}=`))
      ?.split('=')[1];
    return Boolean(token);
  };

  if (isMain) {
    return (
      <>
        <div className="flex h-14 w-full items-center justify-between border border-b-gray-200 bg-white px-4">
          {/* 왼쪽: 로고 */}
          <div className="flex items-center">
            <Image src="/shared-assets/logo.svg" alt="Logo" width={86} height={32} />
          </div>

          {/* 오른쪽: 로그인/로그아웃 + 메뉴 */}
          <div className="flex items-center gap-2">
            {isLoggedIn() ? (
              <Button size="xs" variant="line_secondary" onClick={onLogoutClick}>
                로그아웃
              </Button>
            ) : (
              <Button size="xs" variant="line_secondary" onClick={onLoginClick}>
                로그인
              </Button>
            )}
            <IconButton
              iconSrc="/shared-assets/Hamburger.svg"
              size="xl"
              onClick={handleMenuToggle}
            />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          menuItems={menuItems}
          alignment={menuAlignment}
          headerComponent={headerComponent}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex h-14 w-full items-center justify-between border border-b-gray-200 bg-white px-4">
        {menuAlignment === 'right' ? (
          <>
            {onBackClick ? (
              <IconButton iconSrc="/shared-assets/ArrowLeft.svg" size="xl" onClick={onBackClick} />
            ) : (
              <div className="w-10" />
            )}
            <Title size="xs" weight="bold" className="text-center">
              {title}
            </Title>
            {onHomeClick ? (
              <IconButton iconSrc="/shared-assets/Home.svg" size="xl" onClick={onHomeClick} />
            ) : (
              <IconButton
                iconSrc="/shared-assets/Hamburger.svg"
                size="xl"
                onClick={handleMenuToggle}
              />
            )}
          </>
        ) : (
          <>
            {onBackClick ? (
              <IconButton iconSrc="/shared-assets/ArrowLeft.svg" size="xl" onClick={onBackClick} />
            ) : (
              <IconButton
                iconSrc="/shared-assets/Hamburger.svg"
                size="xl"
                onClick={handleMenuToggle}
              />
            )}
            <Title size="xs" weight="bold" className="text-center">
              {title}
            </Title>
            <IconButton iconSrc="/shared-assets/Home.svg" size="xl" onClick={onHomeClick} />
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        menuItems={menuItems}
        alignment={menuAlignment}
        headerComponent={headerComponent}
      />
    </>
  );
}
