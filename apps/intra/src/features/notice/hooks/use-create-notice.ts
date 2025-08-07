import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { noticeApi } from '../api/notice';
import { Notice } from '../types/model/notice';
import { CreateNoticeRequest } from '../types/request/create-notice-request';

export default function useCreateNotice(): UseMutationResult<
  Notice,
  Error,
  CreateNoticeRequest,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: noticeApi.CREATE_NOTICE,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      router.push('/notice');
    },
  });

  return mutation;
}
