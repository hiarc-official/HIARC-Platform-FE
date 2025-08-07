import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authApi } from '../api/auth';
import { User } from '../types/model/user';
import { useAuthStore } from '../../../shared/store/auth-store';

export default function useGetMe(): UseQueryResult<User, Error> {
  const { isAuthenticated, clearAuth } = useAuthStore();

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.GET_ME,
    enabled: isAuthenticated,
    retry: false,
  });

  useEffect(() => {
    if (query.error) {
      clearAuth();
    }
  }, [query.error, clearAuth]);

  return query;
}
