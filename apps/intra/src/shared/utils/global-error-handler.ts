import { DialogUtil } from './dialog-util';

interface ErrorInfo {
  title?: string;
  message: string;
  code?: string;
  status?: number;
}

interface AxiosError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      code?: string;
    };
  };
  message?: string;
  isAxiosError?: boolean;
}

export class GlobalErrorHandler {
  private static isHandlingError = false;

  /**
   * 에러를 분석하고 적절한 메시지를 생성합니다
   */
  private static parseError(error: unknown): ErrorInfo {
    // Axios 에러 체크
    if (error && typeof error === 'object' && ('response' in error || 'isAxiosError' in error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;

      let message = '알 수 없는 오류가 발생했습니다.';
      let title = '오류';

      switch (status) {
        case 400:
          title = '잘못된 요청';
          message = data?.message || '요청이 잘못되었습니다.';
          break;
        case 401:
          title = '인증 오류';
          message = '로그인이 필요하거나 권한이 없습니다.';
          break;
        case 403:
          title = '접근 거부';
          message = '해당 기능에 대한 권한이 없습니다.';
          break;
        case 404:
          title = '페이지를 찾을 수 없음';
          message = '요청하신 페이지나 리소스를 찾을 수 없습니다.';
          break;
        case 409:
          title = '충돌 오류';
          message = data?.message || '데이터 충돌이 발생했습니다.';
          break;
        case 422:
          title = '입력 오류';
          message = data?.message || '입력된 정보를 확인해주세요.';
          break;
        case 429:
          title = '요청 제한';
          message = '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          title = '서버 오류';
          message = '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
          break;
        default:
          message = data?.message || axiosError.message || '알 수 없는 오류가 발생했습니다.';
      }

      return { title, message, status, code: data?.code };
    }

    // 일반 Error 객체
    if (error instanceof Error) {
      return {
        title: '오류',
        message: error.message,
      };
    }

    // 문자열 에러
    if (typeof error === 'string') {
      return {
        title: '오류',
        message: error,
      };
    }

    // 기타 알 수 없는 에러
    return {
      title: '알 수 없는 오류',
      message: '예상치 못한 오류가 발생했습니다.',
    };
  }

  /**
   * 에러를 처리하고 다이얼로그를 표시합니다
   */
  static handleError(error: unknown, customMessage?: string): void {
    // 중복 에러 처리 방지
    if (this.isHandlingError) {
      return;
    }

    this.isHandlingError = true;
    console.error('🚨 [GLOBAL ERROR HANDLER]', error);

    const errorInfo = this.parseError(error);
    const message = customMessage || errorInfo.message;

    DialogUtil.showError(message, errorInfo.title);

    // 잠시 후 플래그 해제 (다이얼로그가 표시된 후)
    setTimeout(() => {
      this.isHandlingError = false;
    }, 100);
  }

  /**
   * 비동기 함수를 래핑하여 에러를 자동으로 처리합니다
   */
  static wrap<T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
    customErrorMessage?: string
  ): T {
    return ((...args: Parameters<T>) =>
      Promise.resolve(fn(...args)).catch((error) => {
        this.handleError(error, customErrorMessage);
        throw error; // 필요시 다시 throw
      })) as T;
  }

  /**
   * 비동기 함수를 실행하고 에러를 자동으로 처리합니다 (에러를 다시 throw하지 않음)
   */
  static async execute<T>(fn: () => Promise<T>, customErrorMessage?: string): Promise<T | null> {
    try {
      return await fn();
    } catch (error) {
      this.handleError(error, customErrorMessage);
      return null;
    }
  }
}

/**
 * 전역 일반 에러 처리 (promise rejection은 제외)
 */
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('🚨 [GLOBAL ERROR]', event.error);
    GlobalErrorHandler.handleError(event.error);
  });
}
