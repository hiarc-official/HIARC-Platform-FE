import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../../api/member';
import type { ExcellentSeasonResponse } from '../../types/member';

export function useMemberExcellentSeasons(
  memberId: number
): UseQueryResult<ExcellentSeasonResponse[], Error> {
  return useQuery({
    queryKey: ['member', memberId, 'excellent-seasons'],
    queryFn: () => memberApi.GET_MEMBER_EXCELLENT_SEASONS(memberId),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
