import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { studyApi } from '@/features/study/api';
import { StudyInitialForm } from '@/features/study/types';

export function useStudyInitialForm(
  studyId: number | undefined
): UseQueryResult<StudyInitialForm, Error> {
  const query = useQuery({
    queryKey: ['study-initial-form', studyId],
    queryFn: () => studyApi.GET_STUDY_INITIAL_FORM(studyId!),
    enabled: Boolean(studyId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
