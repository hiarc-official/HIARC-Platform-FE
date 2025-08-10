import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';

export default function useApplyToStudy(): UseMutationResult<
  void,
  Error,
  string,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studyApi.APPLY_TO_STUDY,
    onSuccess: (_, studyId) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['studies', studyId] });
      queryClient.invalidateQueries({ queryKey: ['members', 'me', 'studies'] });
    },
  });
}