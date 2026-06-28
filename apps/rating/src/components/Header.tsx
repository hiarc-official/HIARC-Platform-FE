'use client';

import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogUtil,
} from '@hiarc-platform/design-system';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '@/hooks/use-me';
import { authApi } from '@/api/AuthApi';
import { getId } from '@/api/AdminApi';

const INTRA_URL = 'https://intra.hiarc-official.com';

const Header = (): React.ReactElement => {
  const { isAuthenticated, me } = useMe();
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSearch = async (): Promise<void> => {
    const handle = searchInput.trim();
    if (!handle) {
      return;
    }
    setIsFetching(true);
    try {
      const res = await getId(handle);
      const data = res?.data as { id?: number; memberId?: number } | undefined;
      const memberId = data?.id ?? data?.memberId;
      if (memberId) {
        window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
        setSearchInput('');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('핸들 검색 실패:', error);
      setShowError(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogin = (): void => {
    window.location.href = `${INTRA_URL}/login`;
  };

  const handleLogout = (): void => {
    DialogUtil.showConfirm(
      '정말 로그아웃하시겠습니까?',
      async () => {
        try {
          await authApi.LOGOUT();
        } catch (error) {
          console.error('로그아웃 실패:', error);
        }
        queryClient.removeQueries({ queryKey: ['auth', 'me'] });
        window.location.href = '/';
      },
      undefined,
      { title: '로그아웃', confirmText: '로그아웃', cancelText: '취소' }
    );
  };

  const searchBox = (
    <Input
      type="search"
      variant="search"
      placeholder={isAuthenticated ? 'BOJ 핸들명을 입력하세요' : '로그인 후 검색 가능합니다'}
      className="h-[44px] w-full md:w-[328px]"
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && isAuthenticated) {
          handleSearch();
        }
      }}
      disabled={!isAuthenticated || isFetching}
    />
  );

  const authSection = isAuthenticated ? (
    <div className="flex items-center gap-3">
      {me?.bojHandle && (
        <Label size="sm" weight="medium" className="hidden text-gray-700 md:block">
          {me.bojHandle}
        </Label>
      )}
      <Button variant="secondary" size="sm" onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  ) : (
    <Button variant="secondary" size="sm" onClick={handleLogin}>
      로그인
    </Button>
  );

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-4">
        {/* 데스크탑 */}
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="flex items-center gap-8">
            <Link href="/" className="rounded-lg p-2 transition-colors hover:bg-gray-100">
              <Image
                src="/shared-assets/Logo.svg"
                alt="HI-ARC"
                width={120}
                height={30}
                draggable={false}
                className="select-none"
              />
            </Link>
            <nav className="flex items-center gap-4">
              <a href={`${INTRA_URL}/announcement`} className="text-gray-200 transition-colors hover:text-gray-700">
                <Label size="lg" weight="bold" className="cursor-pointer">
                  공지사항
                </Label>
              </a>
              <a href={`${INTRA_URL}/study`} className="text-gray-200 transition-colors hover:text-gray-700">
                <Label size="lg" weight="bold" className="cursor-pointer">
                  스터디
                </Label>
              </a>
              <Link href="/" className="text-gray-900">
                <Label size="lg" weight="bold" className="cursor-pointer">
                  하이팅
                </Label>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            {searchBox}
            {authSection}
          </div>
        </div>

        {/* 모바일 */}
        <div className="flex w-full flex-col gap-3 md:hidden">
          <div className="flex w-full items-center justify-between">
            <Link href="/">
              <Image
                src="/shared-assets/Logo.svg"
                alt="HI-ARC"
                width={100}
                height={25}
                draggable={false}
                className="select-none"
              />
            </Link>
            {authSection}
          </div>
          {searchBox}
        </div>
      </div>

      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>검색 실패</DialogTitle>
            <DialogDescription>해당 BOJ 핸들명을 가진 회원을 찾을 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowError(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
