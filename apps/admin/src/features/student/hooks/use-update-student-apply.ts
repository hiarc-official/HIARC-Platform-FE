import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

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
  const { showSuccess, showMessage } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ semesterId, memberId, applicationStatus }: UpdateStudentApplyParams) =>
      studentApi.UPDATE_STUDENT_APPLY(semesterId, memberId, applicationStatus),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      showSuccess('학생 지원 상태가 성공적으로 업데이트되었습니다.');
    },
    onError: (error: any) => {
      console.error('[HOOK] useUpdateStudentApply 에러:', error);
      
      if (error.response?.status === 403) {
        showMessage('권한 오류', '학생 지원 상태 변경 권한이 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 404) {
        showMessage('오류', '해당 학생을 찾을 수 없습니다.', 'error');
        return;
      }
      
      showMessage('오류', '학생 지원 상태 업데이트에 실패했습니다.', 'error');
    },
  });

  return mutation;
}