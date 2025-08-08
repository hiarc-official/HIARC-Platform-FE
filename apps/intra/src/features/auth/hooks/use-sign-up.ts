import { useMutation, UseMutationResult } from '@tanstack/react-query';
import Router from 'next/navigation';
import { authApi, SignupRequest } from '../api/auth';
import { User } from '../types/model/user';

export default function useSignUp(): UseMutationResult<
  User,
  Error,
  SignupRequest,
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
