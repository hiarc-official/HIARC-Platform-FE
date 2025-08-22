import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { DialogUtil } from '@hiarc-platform/ui';

export function useDeleteMember(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (memberId: number) => studentApi.DELETE_MEMBER(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      queryClient.invalidateQueries({ queryKey: ['admin-list'] });
      queryClient.invalidateQueries({ queryKey: ['instructor-list'] });
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      DialogUtil.showSuccess('회원이 성공적으로 삭제되었습니다.');
    },
  });

  return mutation;
}
