import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { StudyStatusUpdateResponse } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

export function useUpdateStudyStatus(): UseMutationResult<
  StudyStatusUpdateResponse,
  Error,
  number,
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (studyId: number) => studyApi.UPDATE_STUDY_STATUS(studyId),
    onSuccess: (response, studyId) => {
      console.log('[HOOK] useUpdateStudyStatus 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['study', studyId] });
      showSuccess('스터디 상태가 성공적으로 변경되었습니다.');
    },
    onError: (error) => {
      console.error('[HOOK] useUpdateStudyStatus 에러:', error);
    },
  });

  return mutation;
}