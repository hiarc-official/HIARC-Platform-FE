import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { CreateAnnouncementRequest } from '../types/request/create-announcement-request';

import { UseMutationResult } from '@tanstack/react-query';

export const useCreateAdminAnnouncement = (): UseMutationResult<
  unknown,
  unknown,
  CreateAnnouncementRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnnouncementRequest) =>
      announcementApi.CREATE_ADMIN_ANNOUNCEMENT(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
    },
  });
};
