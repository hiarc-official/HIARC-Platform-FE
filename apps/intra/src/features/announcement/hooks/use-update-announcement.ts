import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { announcementApi } from '../api/announcement';
import { Announcement } from '@hiarc-platform/shared';
import type { UpdateAnnouncementRequest } from '../types/request/update-announcement-request';
import { DialogUtil } from '@hiarc-platform/ui';

interface UpdateAnnouncementParams {
  id: string;
  data: UpdateAnnouncementRequest;
}

export default function useUpdateAnnouncement(): UseMutationResult<
  Announcement,
  Error,
  UpdateAnnouncementParams,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateAnnouncementParams) =>
      announcementApi.UPDATE_ANNOUNCEMENT(id, data),
    onSuccess: (updatedAnnouncement) => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.setQueryData(
        ['announcement', updatedAnnouncement.announcementId],
        updatedAnnouncement
      );
      router.push(`/announcement/${updatedAnnouncement.announcementId}`);
    },
  });

  return mutation;
}
