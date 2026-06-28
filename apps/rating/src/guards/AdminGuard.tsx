'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
          alert('관리자 로그인을 해주세요!');
        }

        setAuthorized(isAdmin);
      } catch (error) {
        console.error('인증 확인 중 오류:', error);
        alert('관리자 로그인을 하고와주세요!');
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    if (!loading && !authorized) {
      router.replace('/');
    }
  }, [loading, authorized, router]);

  if (loading) {return <div>인증 확인 중...</div>;}
  if (!authorized) {return null;}
  return children;
};
