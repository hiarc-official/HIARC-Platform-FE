import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { CreateAnnouncementRequest } from '../types/request/create-announcement-request';

export const useCreateAdminAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnnouncementRequest) => 
      announcementApi.CREATE_ADMIN_ANNOUNCEMENT(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
    },
  });
};