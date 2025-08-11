import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { StudyQueryParams } from '../types/request/study-request';
import type { PageAllStudyResponse } from '../types/response/study-response';

export function useStudies(
  params: StudyQueryParams = {}
): UseQueryResult<PageAllStudyResponse, Error> {
  console.log('[HOOK] useStudies 호출:', params);

  const query = useQuery({
    queryKey: ['studies', params],
    queryFn: () => studyApi.GET_ALL_STUDIES(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  console.log('[HOOK] useStudies 결과:', {
    isLoading: query.isLoading,
    error: query.error,
    dataLength: query.data?.content?.length,
  });

  return query;
}