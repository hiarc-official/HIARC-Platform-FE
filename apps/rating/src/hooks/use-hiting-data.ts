import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchHitingData } from '../api/MainPageApi';
import { HitingDataState } from '../types/DataType';

export function useHitingData(): UseQueryResult<HitingDataState, Error> {
  return useQuery({
    queryKey: ['hiting', 'main'],
    queryFn: fetchHitingData,
  });
}
