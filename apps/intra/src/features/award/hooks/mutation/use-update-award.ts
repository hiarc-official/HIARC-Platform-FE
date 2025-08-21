import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { awardsApi } from '../api/awards';
import { UpdateAwardRequest } from '../types/request/update-award-request';

export default function useUpdateAward(): UseMutationResult<
  void,
  Error,
  { awardId: number; awardData: UpdateAwardRequest },
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
