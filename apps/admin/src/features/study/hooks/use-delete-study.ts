import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { studyApi } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

export function useDeleteStudy(): UseMutationResult<void, Error, number, unknown> {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (studyId: number) => studyApi.DELETE_STUDY(studyId),
    onSuccess: (_, studyId) => {
      console.log('[HOOK] useDeleteStudy 성공:', studyId);
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.removeQueries({ queryKey: ['study', studyId] });
      showSuccess('스터디가 성공적으로 삭제되었습니다.');
      router.push('/study');
    },
    onError: (error) => {
      console.error('[HOOK] useDeleteStudy 에러:', error);
    },
  });

  return mutation;
}