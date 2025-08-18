import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

interface PatchAdminParams {
  semesterId: number;
  memberId: number;
  adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
}

export function usePatchAdmin(): UseMutationResult<void, Error, PatchAdminParams, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showMessage } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (params: PatchAdminParams) => studentApi.PATCH_ADMIN(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-list', variables.semesterId] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      showSuccess('관리자 권한이 성공적으로 수정되었습니다.');
    },
    onError: (error: any) => {
      console.error('[HOOK] usePatchAdmin 에러:', error);
      
      if (error.response?.status === 403) {
        showMessage('권한 오류', '관리자 권한 수정 권한이 없습니다.', 'error');
        return;
      }
      
      if (error.response?.status === 404) {
        showMessage('오류', '해당 관리자를 찾을 수 없습니다.', 'error');
        return;
      }
      
      showMessage('오류', '관리자 권한 수정에 실패했습니다.', 'error');
    },
  });

  return mutation;
}