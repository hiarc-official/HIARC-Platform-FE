import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { announcementApi } from '../api/announcement';
import type { AnnouncementResponse, UpdateAnnouncementRequest } from '../types/announcement';

interface UpdateAnnouncementParams {
  id: string;
  data: UpdateAnnouncementRequest;
}

export default function useUpdateAnnouncement(): UseMutationResult<
  AnnouncementResponse,
  Error,
  UpdateAnnouncementParams,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateAnnouncementParams) => announcementApi.UPDATE_ANNOUNCEMENT(id, data),
    onSuccess: (updatedAnnouncement) => {
      console.log('[HOOK] useUpdateAnnouncement 성공:', updatedAnnouncement);
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.setQueryData(['announcement', updatedAnnouncement.id], updatedAnnouncement);
      router.push(`/announcement/${updatedAnnouncement.id}`);
    },
    onError: (error) => {
      console.error('[HOOK] useUpdateAnnouncement 에러:', error);
    },
  });

  return mutation;
}