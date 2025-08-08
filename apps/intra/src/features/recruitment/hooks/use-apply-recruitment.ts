import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import { RecruitmentApplicationRequest } from '../types/request/recruitment-application-request';

export default function useApplyRecruitment(): UseMutationResult<
  void,
  Error,
  RecruitmentApplicationRequest,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recruitmentApi.APPLY_RECRUITMENT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruitment'] });
      queryClient.invalidateQueries({ queryKey: ['recruitment', 'applications'] });
    },
  });
}