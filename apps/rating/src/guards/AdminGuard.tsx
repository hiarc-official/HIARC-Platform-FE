'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DialogUtil } from '@hiarc-platform/design-system';
import { authApi } from '../api/AuthApi';

export const AdminGuard = ({ children }: PropsWithChildren): React.ReactNode => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async (): Promise<void> => {
      try {
        const userData = await authApi.GET_ME();
        const isAdmin = userData.memberRole === 'ADMIN';

        if (!isAdmin) {
          DialogUtil.showError('관리자 권한이 필요합니다. 관리자 계정으로 로그인해주세요.', () =>
            router.replace('/')
          );
        }

        setAuthorized(isAdmin);
      } catch (error) {
        console.error('인증 확인 중 오류:', error);
        DialogUtil.showError('관리자 로그인이 필요합니다.', () => router.replace('/'));
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [router]);

  if (loading) {
    return <div className="p-10 text-center text-gray-600">인증 확인 중...</div>;
  }
  if (!authorized) {
    return null;
  }
  return children;
};
