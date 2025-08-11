import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { StudyResponse, UpdateStudyRequest } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

interface UpdateStudyParams {
  studyId: number;
  data: UpdateStudyRequest;
}

export function useUpdateStudy(): UseMutationResult<
  StudyResponse,
  Error,
  UpdateStudyParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ studyId, data }: UpdateStudyParams) =>
      studyApi.UPDATE_STUDY(studyId, data),
    onSuccess: (response, variables) => {
      console.log('[HOOK] useUpdateStudy 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['study', variables.studyId] });
      showSuccess('스터디 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('[HOOK] useUpdateStudy 에러:', error);
    },
  });

  return mutation;
}