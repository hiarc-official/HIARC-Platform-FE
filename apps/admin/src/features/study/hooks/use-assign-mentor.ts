import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { AssignMentorResponse, AssignMentorRequest } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

interface AssignMentorParams {
  studyId: number;
  mentorData: AssignMentorRequest;
}

export function useAssignMentor(): UseMutationResult<
  AssignMentorResponse,
  Error,
  AssignMentorParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({ studyId, mentorData }: AssignMentorParams) =>
      studyApi.ASSIGN_MENTOR(studyId, mentorData),
    onSuccess: (response, variables) => {
      console.log('[HOOK] useAssignMentor 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['study', variables.studyId] });
      showSuccess(`멘토 ${response.data.mentorName}이(가) 성공적으로 할당되었습니다.`);
    },
    onError: (error) => {
      console.error('[HOOK] useAssignMentor 에러:', error);
    },
  });

  return mutation;
}