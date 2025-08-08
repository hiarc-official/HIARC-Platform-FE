import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { noticeApi } from '../api/notice';

export default function useDeleteNotice(): UseMutationResult<void, Error, string, unknown> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: noticeApi.DELETE_NOTICE,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      queryClient.removeQueries({ queryKey: ['notice', deletedId] });
      router.push('/notice');
    },
  });

  return mutation;
}
