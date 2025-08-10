import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { awardsApi } from '../api/awards';
import { UpdateAwardRequest } from '../types/request/update-award-request';
import { Award } from '../types/model/award';

export default function useUpdateAward(): UseMutationResult<
  Award,
  Error,
  { awardId: string; awardData: UpdateAwardRequest },
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ awardId, awardData }) => awardsApi.UPDATE_AWARD(awardId, awardData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      queryClient.invalidateQueries({ queryKey: ['awards', 'me'] });
    },
  });
}