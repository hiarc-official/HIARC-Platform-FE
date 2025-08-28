import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../../../shared/store/auth-store';
import { queryKeys } from '@/shared/constants/query-keys';
import { CookieUtil } from '@/shared/utils/cookie-util';

export default function useLogout(): UseMutationResult<void, Error, void, unknown> {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: authApi.LOGOUT,
    onSuccess: () => {
      clearAuth();
      CookieUtil.clearAllAuthData();
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
      queryClient.clear();

      // 홈으로 이동 후 새로고침으로 상태 완전 초기화
      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    onError: () => {
      clearAuth();
      CookieUtil.clearAllAuthData();
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
      queryClient.clear();

      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  });

  return mutation;
}
