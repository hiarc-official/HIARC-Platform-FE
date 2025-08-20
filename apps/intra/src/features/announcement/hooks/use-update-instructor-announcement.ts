import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { UpdateAnnouncementRequest } from '../types/request/update-announcement-request';

export const useUpdateInstructorAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      studyId, 
      announcementId, 
      data 
    }: { 
      studyId: number; 
      announcementId: number; 
      data: UpdateAnnouncementRequest;
    }) =>
      announcementApi.UPDATE_INSTRUCTOR_ANNOUNCEMENT(studyId, announcementId, data),
    onSuccess: (_, { studyId, announcementId }) => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcement', announcementId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['study', studyId] });
    },
  });
};