import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi, SignupRequest } from '../api/auth';

export default function useSignUp(): UseMutationResult<void, Error, SignupRequest, unknown> {
  const mutation = useMutation({
    mutationFn: authApi.SIGN_UP,
    onSuccess: () => {
      localStorage.clear();
      // Use window.location instead of useRouter to avoid hook issues
      window.location.href = '/';
    },
    // onError 제거 - 전역 핸들러가 처리하도록 함
  });

  return mutation;
}
