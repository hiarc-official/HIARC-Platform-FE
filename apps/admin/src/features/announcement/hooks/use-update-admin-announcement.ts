import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { UpdateAnnouncementRequest } from '../types/request/update-announcement-request';

export const useUpdateAdminAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnnouncementRequest }) =>
      announcementApi.UPDATE_ADMIN_ANNOUNCEMENT(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['admin-announcement'] });
    },
  });
};