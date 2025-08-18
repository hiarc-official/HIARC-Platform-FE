import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';
import { DialogUtil } from '@hiarc-platform/ui';

interface UpdateStudentApplyParams {
  semesterId: number;
  memberId: number;
  applicationStatus: string;
}

export function useUpdateStudentApply(): UseMutationResult<
  void,
  Error,
  UpdateStudentApplyParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation<void, Error, UpdateStudentApplyParams>({
    mutationFn: ({ semesterId, memberId, applicationStatus }: UpdateStudentApplyParams) =>
      studentApi.UPDATE_STUDENT_APPLY(semesterId, memberId, applicationStatus),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      showSuccess('학생 지원 상태가 성공적으로 업데이트되었습니다.');
    },
    onError: (error: Error) => {
      DialogUtil.showError('학생 지원 상태 업데이트 실패', error.message);
    },
  });

  return mutation;
}
