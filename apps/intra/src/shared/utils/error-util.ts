import { AxiosError } from 'axios';
import { DialogUtil } from '@hiarc-platform/ui';

/**
 * 에러를 처리하고 다이얼로그로 표시하는 유틸리티 함수
 */
export const ErrorUtil = {
  /**
   * 에러를 처리하고 에러 다이얼로그를 표시합니다
   * @param error - 처리할 에러
   * @param defaultMessage - 백엔드 메시지가 없을 때 사용할 기본 메시지
   * @param title - 다이얼로그 제목 (기본값: undefined)
   * @param onConfirm - 확인 버튼 클릭 시 실행할 콜백
   */
  showError: (
    error: unknown,
    defaultMessage = '오류가 발생했습니다.',
    title?: string,
    onConfirm?: () => void
  ) => {
    console.error('Error occurred:', error);
    
    const axiosError = error as AxiosError<{ message?: string }>;
    const backendMessage = axiosError.response?.data?.message;
    const errorMessage = backendMessage || (error as Error)?.message || defaultMessage;
    
    DialogUtil.showError(title, errorMessage, onConfirm);
  },

  /**
   * 에러 메시지만 추출하여 반환합니다 (다이얼로그 표시 없음)
   * @param error - 처리할 에러
   * @param defaultMessage - 백엔드 메시지가 없을 때 사용할 기본 메시지
   * @returns 에러 메시지 문자열
   */
  getErrorMessage: (error: unknown, defaultMessage = '오류가 발생했습니다.'): string => {
    const axiosError = error as AxiosError<{ message?: string }>;
    const backendMessage = axiosError.response?.data?.message;
    return backendMessage || (error as Error)?.message || defaultMessage;
  }
};