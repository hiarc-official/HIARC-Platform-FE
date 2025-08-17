import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';
import { CreateAssignmentRequest } from '../types/request/create-assignment-request';

export function useCreateAssignment(): UseMutationResult<
  void,
  Error,
  { studyId: number; lectureId: number; data: CreateAssignmentRequest },
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({
      studyId,
      lectureId,
      data,
    }: {
      studyId: number;
      lectureId: number;
      data: CreateAssignmentRequest;
    }) => studyApi.CREATE_ASSIGNMENT(studyId, lectureId, data),
    onSuccess: () => {
      showSuccess('과제가 성공적으로 등록되었습니다.');

      // 관련 쿼리들 무효화하여 최신 데이터 반영
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
    onError: (error) => {
      console.error('[HOOK] useCreateAssignment 에러:', error);
    },
  });

  return mutation;
}
