import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth';
import { useAuthStore } from '@/shared';
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
      queryClient.removeQueries({ queryKey: ['auth', 'me'] });
      queryClient.clear();

      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    onError: () => {
      clearAuth();
      CookieUtil.clearAllAuthData();
      queryClient.removeQueries({ queryKey: ['auth', 'me'] });
      queryClient.clear();

      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  });

  return mutation;
}
