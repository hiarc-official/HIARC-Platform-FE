import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { Lecture } from '@hiarc-platform/shared';

export function useLecturesByStudy(studyId: number): UseQueryResult<Lecture[], Error> {
  console.log('[HOOK] useLecturesByStudy 호출:', studyId);

  const query = useQuery({
    queryKey: ['lectures', studyId],
    queryFn: () => studyApi.GET_LECTURES_BY_STUDY(studyId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
