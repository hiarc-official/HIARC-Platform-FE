import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { myApi } from '../../api/my';
import { MyPageData } from '../../types/model/my-page-data';

export function useMyPageData(): UseQueryResult<MyPageData, Error> {
  return useQuery({
    queryKey: ['member', 'me'],
    queryFn: myApi.GET_MY_PAGE_DATA,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
