'use client';

import { Button, DialogUtil, Input, Label } from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { IconButton } from '@hiarc-platform/ui';
import { StudyAttendanceDialog } from '@/features/study/components/study-attendance-dialog';
import { studyMemberApi } from '@/features/study/api';
import useLogout from '@/features/auth/hooks/mutation/use-logout';

interface DesktopHeaderProps {
  isAuthenticated: boolean;
}

export function DesktopHeader({ isAuthenticated }: DesktopHeaderProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
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
        cancelText: '취소',
      }
    );
  };

  const handleAttendanceCheck = async (): Promise<void> => {
    try {
      const attendanceData = await studyMemberApi.GET_STUDY_FOR_ATTENDANCE();
      DialogUtil.showComponent(<StudyAttendanceDialog data={attendanceData} />);
    } catch (error) {
      DialogUtil.showServerError(error);
    }
  };

  const isActive = (path: string): boolean => pathname.startsWith(`/${path}`);

  return (
    <div className="hidden w-full items-center justify-between md:flex">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src="/shared-assets/Logo.svg" alt="HiarcLogo" width={120} height={30} />
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/announcement"
            className={`text-sm transition-colors ${
              isActive('announcement')
                ? 'font-semibold text-gray-900'
                : 'font-medium text-gray-200 hover:text-gray-700'
            }`}
          >
            <Label size="lg" weight="bold" className="cursor-pointer">
              공지사항
            </Label>
          </Link>
          <Link
            href="/study"
            className={`text-sm transition-colors ${
              isActive('study')
                ? 'font-semibold text-gray-900'
                : 'font-medium text-gray-200 hover:text-gray-700'
            }`}
          >
            <Label size="lg" weight="bold" className="cursor-pointer">
              스터디
            </Label>
          </Link>
          <a
            href="https://www.hi-rating.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-200 transition-colors hover:text-gray-700"
          >
            <Label size="lg" weight="bold" className="cursor-pointer">
              하이팅
            </Label>
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="search"
          variant="search"
          placeholder="학회원을 검색해보세요"
          className="h-[44px] w-[328px]"
        />
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <IconButton
              iconSrc="/shared-assets/User.svg"
              aria-label="프로필"
              size="lg"
              onClick={handleMyPage}
            />
            <Button size="sm" className="bg-primary-100" onClick={handleAttendanceCheck}>
              출석체크
            </Button>
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
