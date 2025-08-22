import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { DialogUtil } from '@hiarc-platform/ui';

interface PatchAdminParams {
  semesterId: number;
  memberId: number;
  adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
}

export function usePatchAdmin(): UseMutationResult<void, Error, PatchAdminParams, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: PatchAdminParams) => studentApi.PATCH_ADMIN(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-list', variables.semesterId] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      DialogUtil.showSuccess('관리자 권한이 성공적으로 수정되었습니다.');
    },
  });

  return mutation;
}
