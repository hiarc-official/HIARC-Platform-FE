import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

interface CreateAdminParams {
  semesterId: number;
  bojHandle: string;
  adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
}

export function useCreateAdmin(): UseMutationResult<void, Error, CreateAdminParams, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showMessage } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (params: CreateAdminParams) => studentApi.CREATE_ADMIN(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-list', variables.semesterId] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      showSuccess('관리자가 성공적으로 추가되었습니다.');
    },
    onError: (error: any) => {
      console.error('[HOOK] useCreateAdmin 에러:', error);
      
      if (error.response?.status === 403) {
        showMessage('권한 오류', '관리자 생성 권한이 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 404) {
        showMessage('오류', '해당 사용자를 찾을 수 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 409) {
        showMessage('오류', '이미 관리자로 등록된 사용자입니다.', 'error');
        return;
      }
      
      showMessage('오류', '관리자 추가에 실패했습니다.', 'error');
    },
  });

  return mutation;
}