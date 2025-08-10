import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { awardsApi } from '../api/awards';
import { CreateAwardRequest } from '../types/request/create-award-request';
import { Award } from '../types/model/award';

export default function useCreateAward(): UseMutationResult<
  Award,
  Error,
  CreateAwardRequest,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: awardsApi.CREATE_AWARD,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      queryClient.invalidateQueries({ queryKey: ['awards', 'me'] });
    },
  });
}