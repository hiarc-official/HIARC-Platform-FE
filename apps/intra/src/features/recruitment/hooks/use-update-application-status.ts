import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';

export default function useUpdateApplicationStatus(): UseMutationResult<
  void,
  Error,
  { applicationId: string; status: 'APPROVED' | 'REJECTED' },
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, status }) =>
      recruitmentApi.UPDATE_APPLICATION_STATUS(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruitment', 'applications'] });
    },
  });
}