import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { Admin } from '@hiarc-platform/shared';

export function useAdminList(semesterId: number): UseQueryResult<Admin[], Error> {
  const query = useQuery({
    queryKey: ['admin-list', semesterId],
    queryFn: () => studentApi.GET_ADMIN_LIST(semesterId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: Boolean(semesterId),
  });

  return query;
}