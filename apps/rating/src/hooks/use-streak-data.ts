import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchStreakData, PageableResponse } from '../api/StreakApi';

export function useStreakData(page: number, size: number): UseQueryResult<PageableResponse, Error> {
  return useQuery({
    queryKey: ['hiting', 'streak', page, size],
    queryFn: () => fetchStreakData({ page, size }),
  });
}
