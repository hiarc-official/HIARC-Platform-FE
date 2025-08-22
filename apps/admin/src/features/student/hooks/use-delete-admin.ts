import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { DialogUtil } from '@hiarc-platform/ui';

interface DeleteAdminParams {
  memberId: number;
  semesterId: number;
}

export function useDeleteAdmin(): UseMutationResult<void, Error, DeleteAdminParams, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ memberId, semesterId }: DeleteAdminParams) =>
      studentApi.DELETE_ADMIN(memberId, semesterId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-list', variables.semesterId] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      DialogUtil.showSuccess('관리자가 성공적으로 삭제되었습니다.');
    },
  });

  return mutation;
}
