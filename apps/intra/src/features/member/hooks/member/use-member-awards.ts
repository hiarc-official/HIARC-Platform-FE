import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../../api/member';
import type { AwardResponse } from '../../types/member';

export function useMemberAwards(memberId: string): UseQueryResult<AwardResponse[], Error> {
  return useQuery({
    queryKey: ['member', memberId, 'awards'],
    queryFn: () => memberApi.GET_MEMBER_AWARDS(memberId),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
