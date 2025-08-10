import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { awardsApi } from '../api/awards';
import { AwardQueryParams } from '../types/request/award-query-params';
import { PageableModel } from '@/shared/types/pageable-model';
import { Award } from '../types/model/award';

export default function useAwards(
  params: AwardQueryParams = {}
): UseQueryResult<PageableModel<Award>, Error> {
  return useQuery({
    queryKey: ['awards', params],
    queryFn: () => awardsApi.SEARCH_AWARDS(params),
    placeholderData: keepPreviousData,
  });
}