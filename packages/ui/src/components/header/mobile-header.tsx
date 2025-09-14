'use client';

import React, { useState } from 'react';
import { IconButton } from '../icon-button';
import { Title } from '../label/title';
import { MobileMenu } from './mobile-menu';

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
}

export function MobileHeader({
  title,
  onBackClick,
  onHomeClick,
  menuItems = [],
}: MobileHeaderProps): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex h-14 w-full items-center justify-between border border-b-gray-200 bg-white px-4">
        {onBackClick ? (
          <IconButton iconSrc="/shared-assets/ArrowLeft.svg" size="xl" onClick={onBackClick} />
        ) : (
          <IconButton iconSrc="/shared-assets/Hamburger.svg" size="xl" onClick={handleMenuToggle} />
        )}
        <Title size="xs" weight="bold" className="text-center">
          {title}
        </Title>
        <IconButton iconSrc="/shared-assets/Home.svg" size="xl" onClick={onHomeClick} />
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} menuItems={menuItems} />
    </>
  );
}
