import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

export function useDeleteLecture(): UseMutationResult<
  void,
  Error,
  { studyId: number; announcementId: number },
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ studyId, announcementId }: { studyId: number; announcementId: number }) =>
      studyApi.DELETE_LECTURE(studyId, announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      showSuccess('강의가 성공적으로 삭제되었습니다.');
    },
  });

  return mutation;
}
