import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';
import { UpdateRecruitmentRequest } from '@hiarc-platform/shared';

interface UpdateRecruitmentParams {
  semesterId: number;
  data: UpdateRecruitmentRequest;
}

export function useUpdateRecruitment(): UseMutationResult<
  void,
  Error,
  UpdateRecruitmentParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ semesterId, data }: UpdateRecruitmentParams) =>
      recruitmentApi.UPDATE_RECRUITMENT(semesterId, data),
    onSuccess: (response, variables) => {
      console.log('[HOOK] useUpdateRecruitment 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['recruitment', variables.semesterId] });
      showSuccess('학회원 모집 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('[HOOK] useUpdateRecruitment 에러:', error);
    },
  });

  return mutation;
}
