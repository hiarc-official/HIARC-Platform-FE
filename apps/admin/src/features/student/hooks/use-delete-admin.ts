import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

interface DeleteAdminParams {
  memberId: number;
  semesterId: number;
}

export function useDeleteAdmin(): UseMutationResult<void, Error, DeleteAdminParams, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showMessage } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ memberId, semesterId }: DeleteAdminParams) =>
      studentApi.DELETE_ADMIN(memberId, semesterId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-list', variables.semesterId] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      showSuccess('관리자가 성공적으로 삭제되었습니다.');
    },
    onError: (error: any) => {
      console.error('[HOOK] useDeleteAdmin 에러:', error);
      
      if (error.response?.status === 403) {
        showMessage('권한 오류', '관리자 삭제 권한이 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 404) {
        showMessage('오류', '해당 관리자를 찾을 수 없습니다.', 'error');
        return;
      }
      
      showMessage('오류', '관리자 삭제에 실패했습니다.', 'error');
    },
  });

  return mutation;
}