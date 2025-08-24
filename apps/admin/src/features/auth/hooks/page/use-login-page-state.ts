import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/shared/store/auth-store';
import useGoogleLogin from '@/features/auth/hooks/use-google-login';

export function useLoginPageState() {
  const { user, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const { googleLogin, isLoading: isGoogleLoginLoading } = useGoogleLogin();

  useEffect(() => {
    if (user) {
      logout();
      console.log('이미 로그인된 사용자입니다:', user);
      // router.push('/');
    }
  }, [user, router, logout]);

  const handleGoogleLogin = (): void => {
    googleLogin();
  };

  return {
    user,
    isLoading,
    isGoogleLoginLoading,
    handleGoogleLogin,
  };
}