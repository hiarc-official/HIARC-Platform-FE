import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { CreateAnnouncementRequest } from '../types/request/create-announcement-request';

import { UseMutationResult } from '@tanstack/react-query';

export const useUpdateAdminAnnouncement = (): UseMutationResult<
  unknown,
  unknown,
  { id: number; data: CreateAnnouncementRequest }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateAnnouncementRequest }) =>
      announcementApi.UPDATE_ADMIN_ANNOUNCEMENT(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['admin-announcement'] });
    },
  });
};
