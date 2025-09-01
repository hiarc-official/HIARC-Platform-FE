import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { DialogUtil } from '@hiarc-platform/ui';
import { studyCommonApi } from '../../../api';

export default function useApplyToStudy(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studyCommonApi.APPLY_TO_STUDY,
    onSuccess: (_, studyId) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['studies', studyId] });
      queryClient.invalidateQueries({ queryKey: ['members', 'me', 'studies'] });
      DialogUtil.showSuccess('스터디 신청이 완료되었습니다.');
    },
    onError: (error: Error) => {
      DialogUtil.hideAllDialogs();

      // 403 Forbidden 에러인 경우 커스텀 메시지 표시
      const axiosError = error as { response?: { status?: number }; status?: number };
      if (axiosError?.response?.status === 403 || axiosError?.status === 403) {
        DialogUtil.showDialog({
          type: 'alert',
          title: '스터디 신청은 학회원만 가능합니다.',
        });
      } else {
        DialogUtil.showServerError(error, '스터디 신청 중 오류가 발생했습니다.');
      }
    },
  });
}
