import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { studyMemberApi } from '@/features/study/api';

export function useWithdrawStudent(): UseMutationResult<
  void,
  Error,
  { studyId: number; memberId: number },
  unknown
> {
  const mutation = useMutation({
    mutationFn: ({ studyId, memberId }: { studyId: number; memberId: number }) =>
      studyMemberApi.WITHDRAW_STUDENT(studyId, memberId),
    onSuccess: () => {
      DialogUtil.showSuccess('학생이 성공적으로 탈퇴되었습니다.');
    },
  });

  return mutation;
}
