import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchRankingData } from '../api/RankingApi';

type RankingResult = Awaited<ReturnType<typeof fetchRankingData>>;

export function useRankingData(selected: number): UseQueryResult<RankingResult, Error> {
  return useQuery({
    queryKey: ['hiting', 'ranking', selected],
    queryFn: () => fetchRankingData(selected),
  });
}
