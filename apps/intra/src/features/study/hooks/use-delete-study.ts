import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';

export default function useDeleteStudy(): UseMutationResult<
  void,
  Error,
  string,
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: studyApi.DELETE_STUDY,
    onSuccess: (_, studyId) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.removeQueries({ queryKey: ['study', studyId] });
    },
  });

  return mutation;
}