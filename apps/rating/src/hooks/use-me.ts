import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/AuthApi';

type Me = Awaited<ReturnType<typeof authApi.GET_ME>>;

interface UseMeResult {
  me: Me | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useMe(): UseMeResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.GET_ME,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    me: data,
    isAuthenticated: !isError && Boolean(data),
    isLoading,
  };
}
