import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { Lecture, SelectOption } from '@hiarc-platform/shared';

export function useLectureOptions(studyId: number): UseQueryResult<SelectOption[], Error> {
  console.log('[HOOK] useLectureOptions 호출:', studyId);

  const query = useQuery({
    queryKey: ['lecture-options', studyId],
    queryFn: async (): Promise<SelectOption[]> => {
      const lectures = await studyApi.GET_LECTURES_BY_STUDY(studyId);
      return lectures.map((lecture: Lecture) => ({
        label: lecture.title || `${lecture.round}회차`,
        value: lecture.round?.toString() || '',
      }));
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(studyId), // studyId가 있을 때만 실행
  });

  return query;
}
