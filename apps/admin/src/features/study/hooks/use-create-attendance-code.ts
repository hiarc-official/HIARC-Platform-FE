import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

export function useCreateAttendanceCode(): UseMutationResult<
  void,
  Error,
  { studyId: number; lectureId: number; code: string },
  unknown
> {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: ({
      studyId,
      lectureId,
      code,
    }: {
      studyId: number;
      lectureId: number;
      code: string;
    }) => studyApi.CREATE_ATTENDANCE_CODE(studyId, lectureId, code),
    onSuccess: () => {
      showSuccess('출석 코드가 성공적으로 등록되었습니다.');

      // 관련 쿼리들 무효화하여 최신 데이터 반영
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
    onError: (error: any) => {
      console.error('[HOOK] useCreateAttendanceCode 에러:', error);
      
      // 403 에러의 경우 권한 부족 메시지 표시
      if (error.response?.status === 403) {
        showError('출석 코드 생성 권한이 없습니다. 관리자에게 문의하세요.');
        return;
      }
      
      // 401 에러의 경우 인증 실패 메시지 표시
      if (error.response?.status === 401) {
        showError('로그인이 필요합니다. 다시 로그인해주세요.');
        return;
      }
      
      // 기타 에러의 경우 일반 에러 메시지 표시
      showError('출석 코드 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return mutation;
}
