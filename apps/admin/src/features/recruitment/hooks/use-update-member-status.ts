import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import type { 
  RecruitingMemberUpdateResponse, 
  RecruitingMemberUpdateRequest 
} from '../api/recruitment';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

interface UpdateMemberStatusParams {
  semesterId: number;
  memberId: number;
  data: RecruitingMemberUpdateRequest;
}

export function useUpdateMemberStatus(): UseMutationResult<
  RecruitingMemberUpdateResponse,
  Error,
  UpdateMemberStatusParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ semesterId, memberId, data }: UpdateMemberStatusParams) =>
      recruitmentApi.UPDATE_RECRUITING_MEMBER_STATUS(semesterId, memberId, data),
    onSuccess: (response, variables) => {
      console.log('[HOOK] useUpdateMemberStatus 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['recruitment', 'members', variables.semesterId] });
      showSuccess('지원자 상태가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('[HOOK] useUpdateMemberStatus 에러:', error);
    },
  });

  return mutation;
}