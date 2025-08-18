import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

export function useDeleteMember(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showMessage } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (memberId: number) => studentApi.DELETE_MEMBER(memberId),
    onSuccess: (_, memberId) => {
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      queryClient.invalidateQueries({ queryKey: ['admin-list'] });
      queryClient.invalidateQueries({ queryKey: ['instructor-list'] });
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      showSuccess('회원이 성공적으로 삭제되었습니다.');
    },
    onError: (error: any) => {
      console.error('[HOOK] useDeleteMember 에러:', error);
      
      if (error.response?.status === 403) {
        showMessage('권한 오류', '회원 삭제 권한이 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 404) {
        showMessage('오류', '해당 회원을 찾을 수 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 409) {
        showMessage('오류', '삭제할 수 없는 회원입니다.', 'error');
        return;
      }
      
      showMessage('오류', '회원 삭제에 실패했습니다.', 'error');
    },
  });

  return mutation;
}