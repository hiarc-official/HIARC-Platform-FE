import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../../api/member';
import type { StreakHeatmapResponse } from '../../types/member';

export function useMemberStreakHeatmap(
  memberId: number
): UseQueryResult<StreakHeatmapResponse, Error> {
  return useQuery({
    queryKey: ['member', memberId, 'streak-heatmap'],
    queryFn: () => memberApi.GET_MEMBER_STREAK_HEATMAP(memberId),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
