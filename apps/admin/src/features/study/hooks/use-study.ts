import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { StudyDetailResponse } from '../types/response/study-response';

export function useStudy(
  studyId: number | undefined
): UseQueryResult<StudyDetailResponse, Error> {
  console.log('[HOOK] useStudy 호출:', studyId);

  const query = useQuery({
    queryKey: ['study', studyId],
    queryFn: () => studyApi.GET_STUDY_DETAIL(studyId!),
    enabled: !!studyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  console.log('[HOOK] useStudy 결과:', {
    isLoading: query.isLoading,
    error: query.error,
    studyId: query.data?.data?.studyId,
  });

  return query;
}