import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { myApi } from '../../api/my';
import type { UpdateIntroductionRequest } from '../../types/member';
import { DialogUtil } from '@hiarc-platform/ui';

export function useUpdateMyIntroduction(): UseMutationResult<
  void,
  Error,
  UpdateIntroductionRequest
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: myApi.UPDATE_MY_INTRODUCTION,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member', 'profile'] });
      queryClient.invalidateQueries({ queryKey: ['member', 'me'] });
      DialogUtil.hideAllDialogs();
      DialogUtil.showSuccess('업데이트 완료');
    },
    onError: (error) => {
      DialogUtil.showServerError(error, '자기소개 업데이트 실패');
    },
  });
}
