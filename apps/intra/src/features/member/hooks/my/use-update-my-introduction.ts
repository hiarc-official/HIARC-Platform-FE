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
      DialogUtil.showSuccess('자기소개가 성공적으로 업데이트되었습니다!', '업데이트 완료');
    },
  });
}
