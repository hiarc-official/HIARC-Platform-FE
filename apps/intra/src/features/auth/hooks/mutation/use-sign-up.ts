import React from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi, SignupRequest } from '../../api/auth';
import { DialogUtil } from '@hiarc-platform/ui';
import { GreetingDialog } from '../../components/dialog/greeting-dialog';

export default function useSignUp(): UseMutationResult<void, Error, SignupRequest, unknown> {
  const mutation = useMutation({
    mutationFn: authApi.SIGN_UP,
    onSuccess: async () => {
      localStorage.clear();
      try {
        // 모집 공고 정보 가져오기
        const recruitData = await authApi.RECRUIT_APPLICATION();

        // 첫 번째 다이얼로그 (가입 완료)
        const showSecondDialog = (): void => {
          if (recruitData.greetingDescription) {
            DialogUtil.showComponent(
              React.createElement(GreetingDialog, {
                title: '학회 가입 완료 안내',
                message: recruitData.greetingDescription,
                onConfirm: () => (window.location.href = '/'),
                showBackground: false,
              })
            );
          } else {
            // greetingDescription이 없으면 바로 홈으로 이동
            window.location.href = '/';
          }
        };

        // 첫 번째 다이얼로그에서 확인 버튼을 누르면 두 번째 다이얼로그 표시
        DialogUtil.showComponent(
          React.createElement(GreetingDialog, {
            title: '안내사항',
            message: recruitData.description || '학회 가입이 완료되었습니다.',
            onConfirm: showSecondDialog,
            showBackground: false,
          })
        );
      } catch (error) {
        console.error('Failed to fetch recruit application:', error);
        // API 호출 실패 시 기본 메시지로 첫 번째 다이얼로그만 표시
        DialogUtil.showComponent(
          React.createElement(GreetingDialog, {
            title: '안내사항',
            message: '학회 가입이 완료되었습니다.',
            onConfirm: () => (window.location.href = '/'),
            showBackground: false,
          })
        );
      }
    },
    onError: (error) => {
      DialogUtil.showServerError(error, '회원가입 중 오류가 발생했습니다.');
    },
  });

  return mutation;
}
