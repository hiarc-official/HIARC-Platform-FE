import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../../api/member';
import type { HitingScoreResponse } from '../../types/member';

export function useMemberHitingScore(memberId: number): UseQueryResult<HitingScoreResponse, Error> {
  return useQuery({
    queryKey: ['member', memberId, 'hiting-score'],
    queryFn: () => memberApi.GET_MEMBER_HITING_SCORE(memberId),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
