import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchSearchData, SearchData } from '../api/SearchApi';

export function useSearchData(handle: string): UseQueryResult<SearchData | null, Error> {
  return useQuery({
    queryKey: ['hiting', 'search', handle],
    queryFn: () => fetchSearchData(handle),
    enabled: handle.trim().length > 0,
  });
}
