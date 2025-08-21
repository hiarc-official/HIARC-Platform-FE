'use client';

import { Button, Input, DialogUtil } from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconButton } from '@hiarc-platform/ui';
import useLogout from '@/features/auth/hooks/use-logout';

interface DesktopHeaderProps {
  isAuthenticated: boolean;
}

export function DesktopHeader({ isAuthenticated }: DesktopHeaderProps): React.ReactElement {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogin = (): void => {
    router.push('/login');
  };

  const handleMyPage = (): void => {
    router.push('/my');
  };

  const handleLogout = (): void => {
    DialogUtil.showConfirm(
      '정말 로그아웃하시겠습니까?',
      () => {
        logoutMutation.mutate();
      },
      undefined,
      {
        title: '로그아웃',
        confirmText: '로그아웃',
        cancelText: '취소'
      }
    );
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
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
            </Button>
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