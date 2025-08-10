import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../../api/member';
import type { StreakInfoResponse } from '../../types/member';

export function useMemberStreakInfo(memberId: number): UseQueryResult<StreakInfoResponse, Error> {
  return useQuery({
    queryKey: ['member', memberId, 'streak-info'],
    queryFn: () => memberApi.GET_MEMBER_STREAK_INFO(memberId),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
