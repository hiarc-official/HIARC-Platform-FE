import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth-store';
import type { LoginResponse } from '../types/auth/login-response';
import { LoginResponseModel } from '../types/auth/login-response';
import { useErrorHandler } from './use-error-handler';
import { authApi } from '../api';

// 구글 로그인 처리
export function useGoogleLogin(): ReturnType<typeof useMutation<LoginResponse, Error, string>> {
  const { login, setLoading } = useAuthStore();
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async (authCode: string): Promise<LoginResponse> => {
      setLoading(true);
      return await authApi.googleCallback(authCode);
    },
    onSuccess: (data) => {
      try {
        const response = LoginResponseModel.create(data);

        if (response.hasValidLoginData) {
          const loginData = response.getLoginData();
          if (loginData) {
            login(loginData.user);
          }
        }
      } catch (error) {
        console.error('로그인 응답 처리 실패:', error);
        if (error instanceof Error) {
          handleError(error, { context: 'login_response_processing' });
        }
      }
      setLoading(false);
    },
    onError: (error) => {
      handleError(error, { context: 'google_login' });
      setLoading(false);
    },
  });
}

// 로그아웃
export function useLogout(): ReturnType<typeof useMutation<void, Error, void>> {
  const { logout } = useAuthStore();
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      // 에러가 발생해도 로컬 상태는 클리어
      handleError(error, { context: 'logout' });
      logout();
    },
  });
}
