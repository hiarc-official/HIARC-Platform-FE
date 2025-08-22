import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import { DialogUtil } from '@hiarc-platform/ui';

export function useStartRecruitment(): UseMutationResult<
  void,
  Error,
  { semesterId: number },
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ semesterId }: { semesterId: number }) =>
      recruitmentApi.START_RECRUITMENT(semesterId),
    onSuccess: (response, variables) => {
      console.log('[HOOK] useStartRecruitment 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['recruitment', variables.semesterId] });
      DialogUtil.showSuccess('학회원 모집이 시작되었습니다.');
    },
    onError: (error) => {
      console.error('[HOOK] useStartRecruitment 에러:', error);
    },
  });

  return mutation;
}
