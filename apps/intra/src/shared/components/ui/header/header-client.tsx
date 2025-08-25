'use client';

import { useState } from 'react';
import { MobileHeader } from './mobile-header';
import { DesktopHeader } from './desktop-header';

interface HeaderClientProps {
  isAuthenticated: boolean;
}

export function HeaderClient({ isAuthenticated }: HeaderClientProps): React.ReactElement {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  console.log('HeaderClient - isAuthenticated:', isAuthenticated);

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4">
        <MobileHeader
          isAuthenticated={isAuthenticated}
          isMobileSearchOpen={isMobileSearchOpen}
          setIsMobileSearchOpen={setIsMobileSearchOpen}
        />
        <DesktopHeader isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}