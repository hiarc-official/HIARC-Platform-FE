import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { RoundStatus } from '@hiarc-platform/shared/src/types/study/round-status';
import { studyMemberApi } from '@/features/study/api';

export function useUpdateMemberStatus(): UseMutationResult<
  void,
  Error,
  { studyId: number; memberId: number; roundStatuses: RoundStatus[] },
  unknown
> {
  const mutation = useMutation({
    mutationFn: ({
      studyId,
      memberId,
      roundStatuses,
    }: {
      studyId: number;
      memberId: number;
      roundStatuses: RoundStatus[];
    }) => studyMemberApi.UPDATE_MEMBER_STATUS(studyId, memberId, roundStatuses),
    onSuccess: () => {
      DialogUtil.showSuccess('상태가 성공적으로 업데이트되었습니다.');
    },
  });

  return mutation;
}
