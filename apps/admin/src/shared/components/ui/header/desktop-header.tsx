'use client';

import { Button, Input } from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconButton } from '@hiarc-platform/ui';

interface DesktopHeaderProps {
  isAuthenticated: boolean;
}

export function DesktopHeader({ isAuthenticated }: DesktopHeaderProps): React.ReactElement {
  const router = useRouter();

  const handleLogin = (): void => {
    router.push('/login');
  };

  const handleMyPage = (): void => {
    router.push('/my');
  };

  return (
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
  );
}