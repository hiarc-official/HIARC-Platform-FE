'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton } from '../icon-button';
import { Label } from '../label/label';

interface MenuItem {
  label: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose(): void;
  menuItems: MenuItem[];
}

export function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps): React.ReactElement {
  const router = useRouter();

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleMenuItemClick = (path: string): void => {
    router.push(path);
    onClose();
  };

  const handleOverlayClick = (event: React.MouseEvent): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return <div></div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex" onClick={handleOverlayClick}>
      {/* 왼쪽 슬라이드 메뉴 */}
      <div
        className={`w-80 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 메뉴 헤더 */}
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
          <Label size="lg" weight="bold">
            메뉴
          </Label>
          <IconButton iconSrc="/shared-assets/Close.svg" size="lg" onClick={onClose} />
        </div>

        {/* 메뉴 아이템들 */}
        <div className="flex flex-col py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-gray-50"
              onClick={() => handleMenuItemClick(item.path)}
            >
              <Label size="lg" weight="bold">
                {item.label}
              </Label>
            </button>
          ))}
        </div>
      </div>

      {/* 오른쪽 오버레이 (반투명 배경) */}
      <div className="flex-1 bg-black bg-opacity-30" />
    </div>
  );
}
