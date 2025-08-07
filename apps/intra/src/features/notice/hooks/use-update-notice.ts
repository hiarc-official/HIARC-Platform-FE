import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { noticeApi } from '../api/notice';
import { Notice } from '../types/model/notice';
import { UpdateNoticeRequest } from '../types/request/update-notice-request';

interface UpdateNoticeParams {
  id: string;
  data: UpdateNoticeRequest;
}

export default function useUpdateNotice(): UseMutationResult<
  Notice,
  Error,
  UpdateNoticeParams,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateNoticeParams) => noticeApi.UPDATE_NOTICE(id, data),
    onSuccess: (updatedNotice) => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      queryClient.setQueryData(['notice', updatedNotice.toJson().id], updatedNotice);
      router.push(`/notice/${updatedNotice.toJson().id}`);
    },
  });

  return mutation;
}
