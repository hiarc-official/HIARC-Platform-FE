import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { awardsApi } from '../../api/awards';
import { DialogUtil } from '@hiarc-platform/ui';

export default function useDeleteAward(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: awardsApi.DELETE_AWARD,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      queryClient.invalidateQueries({ queryKey: ['awards', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['member', 'me'] });
      DialogUtil.showSuccess('수상 기록이 성공적으로 삭제되었습니다.');
    },
    onError: () => {
      DialogUtil.showError(
        '해당 대회 기록은 삭제할 수 없습니다.\n필요할 경우 운영진에게 문의 부탁드립니다. '
      );
    },
  });
}
