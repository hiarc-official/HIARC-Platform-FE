import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import type { 
  RecruitmentCreateResponse, 
  RecruitmentCreateRequest 
} from '../api/recruitment';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

interface CreateRecruitmentParams {
  semesterId: number;
  data: RecruitmentCreateRequest;
}

export function useCreateRecruitment(): UseMutationResult<
  RecruitmentCreateResponse,
  Error,
  CreateRecruitmentParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ semesterId, data }: CreateRecruitmentParams) =>
      recruitmentApi.CREATE_RECRUITMENT(semesterId, data),
    onSuccess: (response, variables) => {
      console.log('[HOOK] useCreateRecruitment 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['recruitment', variables.semesterId] });
      showSuccess('학회원 모집이 성공적으로 시작되었습니다.');
    },
    onError: (error) => {
      console.error('[HOOK] useCreateRecruitment 에러:', error);
    },
  });

  return mutation;
}