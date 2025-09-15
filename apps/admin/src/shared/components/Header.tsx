'use client';
import { Button, DialogUtil } from '@hiarc-platform/ui';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import { useAuthStore } from '../stores/auth-store';
import { useLogout } from '@/features/auth/hooks';
import Link from 'next/link';
import { CustomLabeledSelector } from './custom-labeled-selector';
import { SemesterAddDialog } from '@/features/semester/components/semester-add-dialog';

export default function Header(): React.ReactElement {
  // Initialize semester store on component mount
  useSemesterStoreInit();
  const { semesterOptions, selectedSemesterId, setSelectedSemester } = useSemesterStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const logoutMutation = useLogout();

  const pathname = usePathname();
  const tabItems = [
    { label: '학회원관리', value: 'manage' },
    { label: '공지사항', value: 'announcement' },
    { label: '스터디', value: 'study' },
    { label: '대회', value: 'award' },
    { label: '운영진', value: 'admin' },
    { label: '하이팅', value: process.env.NEXT_PUBLIC_RATING_ADMIN_URL ?? 'rating' },
  ];

  const handleLogin = (): void => {
    router.push('/login');
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

  const handleAddSemester = (): void => {
    DialogUtil.showComponent(<SemesterAddDialog />);
  };

  return (
    <header className="w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto flex w-full min-w-[600px] max-w-[1200px] items-center justify-between px-5">
        <div className="flex items-center gap-6">
          <Image src="/shared-assets/Logo.svg" alt="HiarcLogo" width={120} height={30} />

          <CustomLabeledSelector
            required={false}
            label=""
            placeholder="로딩 중..."
            options={semesterOptions}
            value={selectedSemesterId || ''}
            onChange={setSelectedSemester}
            className="mb-2 ml-4 w-[142px] border-gray-900 font-normal"
            showAddButton={true}
            addButtonLabel="학기 추가"
            onAddClick={handleAddSemester}
          />

          <nav className="flex gap-8 overflow-x-auto whitespace-nowrap">
            {tabItems.map(({ label, value }) => {
              const isHaitingTab = label === '하이팅';
              const isExternal = isHaitingTab && value.startsWith('http');
              const href = isExternal ? value : `/${value}`;
              const isActive = !isExternal && pathname.includes(href);

              return (
                <Link
                  key={value}
                  href={href}
                  className={`text-lg ${isActive ? 'font-bold text-black' : 'text-gray-200'}`}
                  // 외부 링크일 경우 새 탭에서 열리도록 설정
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
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
    </header>
  );
}
