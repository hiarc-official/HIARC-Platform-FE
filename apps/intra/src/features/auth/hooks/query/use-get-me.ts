import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { MyInfo } from '../../types/model/my-info';
import { useAuthStore } from '@/shared/store/auth-store';
import { authApi } from '../../api/auth';

export default function useGetMe(): UseQueryResult<MyInfo, Error> {
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
