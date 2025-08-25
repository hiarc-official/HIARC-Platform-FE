import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../../../shared/store/auth-store';
import { queryKeys } from '@/shared/constants/query-keys';

export default function useLogout(): UseMutationResult<void, Error, void, unknown> {
  const router = useRouter();
  const { clearAuth, logout } = useAuthStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: authApi.LOGOUT,
    onSuccess: () => {
      console.log('[useLogout] 로그아웃 성공, clearAuth 호출 전');
      // 먼저 인증 상태를 클리어
      clearAuth();
      console.log('[useLogout] clearAuth 호출 후');
      // auth 관련 쿼리만 무효화하고 제거
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
      queryClient.clear();
      console.log('[useLogout] 쿼리 캐시 정리 완료');
      router.push('/');
    },
    onError: () => {
      console.log('[useLogout] 로그아웃 에러, clearAuth 호출');
      // 먼저 인증 상태를 클리어
      clearAuth();
      // auth 관련 쿼리만 무효화하고 제거
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
      queryClient.clear();
      router.push('/');
    },
  });

  return mutation;
}
