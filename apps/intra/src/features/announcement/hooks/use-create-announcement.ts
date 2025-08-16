import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { announcementApi } from '../api/announcement';
import { Announcement } from '@hiarc-platform/shared';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';

export default function useCreateAnnouncement(): UseMutationResult<
  Announcement,
  Error,
  CreateAnnouncementRequest,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: announcementApi.CREATE_ANNOUNCEMENT,
    onSuccess: (newAnnouncement) => {
      console.log('[HOOK] useCreateAnnouncement 성공:', newAnnouncement);
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      router.push(`/announcement/${newAnnouncement.announcementId}`);
    },
    onError: (error) => {
      console.error('[HOOK] useCreateAnnouncement 에러:', error);
    },
  });

  return mutation;
}