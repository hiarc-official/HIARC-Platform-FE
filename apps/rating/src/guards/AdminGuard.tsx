import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authApi } from '../api/AuthApi';

export const AdminGuard = ({ children }: PropsWithChildren) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const userData = await authApi.GET_ME();
        console.log('사용자 정보:', userData);

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

  if (loading) return <div>인증 확인 중...</div>;
  if (!authorized) return <Navigate to="/" replace />;
  return children;
};
