import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth';
import { useAuthStore } from '../../../shared/store/auth-store';

export default function useLogout(): UseMutationResult<void, Error, void, unknown> {
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const mutation = useMutation({
    mutationFn: authApi.LOGOUT,
    onSuccess: () => {
      clearAuth();
      router.push('/');
    },
    onError: () => {
      clearAuth();
      router.push('/');
    },
  });

  return mutation;
}
