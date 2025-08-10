import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { awardsApi } from '../api/awards';

export default function useDeleteAward(): UseMutationResult<
  void,
  Error,
  string,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: awardsApi.DELETE_AWARD,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      queryClient.invalidateQueries({ queryKey: ['awards', 'me'] });
    },
  });
}