import { useMutation, UseMutationResult } from '@tanstack/react-query';
import Router from 'next/navigation';
import { authApi } from '../api/auth';

export default function useSignUp(): UseMutationResult<
  unknown,
  Error,
  {
    email: string;
    name: string;
    provider: string;
  },
  unknown
> {
  const navigate = Router.useRouter();

  const mutation = useMutation({
    mutationFn: authApi.SIGN_UP,
    onSuccess: () => {
      localStorage.clear();
      navigate.push('/');
      location.reload();
    },
    onError: () => {},
  });

  return mutation;
}
