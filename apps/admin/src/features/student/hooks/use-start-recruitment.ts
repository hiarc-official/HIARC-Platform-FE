import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

export function useStartRecruitment(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showMessage } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (semesterId: number) => studentApi.START_RECRUITMENT(semesterId),
    onSuccess: (_, semesterId) => {
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      showSuccess('모집이 성공적으로 시작되었습니다.');
    },
    onError: (error: any) => {
      console.error('[HOOK] useStartRecruitment 에러:', error);
      
      if (error.response?.status === 403) {
        showMessage('권한 오류', '모집 시작 권한이 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 409) {
        showMessage('오류', '이미 모집이 진행 중입니다.', 'error');
        return;
      }
      
      showMessage('오류', '모집 시작에 실패했습니다.', 'error');
    },
  });

  return mutation;
}