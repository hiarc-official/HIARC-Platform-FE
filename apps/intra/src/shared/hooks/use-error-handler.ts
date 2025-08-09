import { useCallback } from 'react';
import { useErrorStore } from '../store/error-store';

export interface UseErrorHandlerReturn {
  handleError(error: Error, context?: Record<string, unknown>): void;
  showMessage(title: string, message: string, type?: 'error' | 'warning' | 'info'): void;
  showSuccess(message: string): void;
  showWarning(message: string): void;
  showInfo(message: string): void;
  clearErrors(): void;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const { showError, showMessage, clearAllErrors } = useErrorStore();

  const handleError = useCallback(
    (error: Error, context?: Record<string, unknown>) => {
      // 네트워크 에러 처리
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        showError(new Error('네트워크 연결을 확인해주세요'), context);
        return;
      }

      // 인증 에러 처리
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        showError(new Error('로그인이 필요합니다'), context);
        return;
      }

      // 권한 에러 처리
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        showError(new Error('권한이 없습니다'), context);
        return;
      }

      // 서버 에러 처리
      if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
        showError(new Error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요'), context);
        return;
      }

      // 기본 에러 처리
      showError(error, context);
    },
    [showError]
  );

  const handleShowMessage = useCallback(
    (title: string, message: string, type: 'error' | 'warning' | 'info' = 'info') => {
      showMessage(title, message, type);
    },
    [showMessage]
  );

  const showSuccess = useCallback(
    (message: string) => {
      showMessage('성공', message, 'info');
    },
    [showMessage]
  );

  const showWarning = useCallback(
    (message: string) => {
      showMessage('주의', message, 'warning');
    },
    [showMessage]
  );

  const showInfo = useCallback(
    (message: string) => {
      showMessage('알림', message, 'info');
    },
    [showMessage]
  );

  const clearErrors = useCallback(() => {
    clearAllErrors();
  }, [clearAllErrors]);

  return {
    handleError,
    showMessage: handleShowMessage,
    showSuccess,
    showWarning,
    showInfo,
    clearErrors,
  };
}

// Global error handler
export function setupGlobalErrorHandler(): void {
  const { showError } = useErrorStore.getState();

  // 처리되지 않은 Promise rejection 처리
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);

    let error: Error;
    if (event.reason instanceof Error) {
      error = event.reason;
    } else {
      error = new Error(String(event.reason));
    }

    showError(error, {
      type: 'unhandledrejection',
      promise: event.promise,
    });

    // 기본 동작 방지 (콘솔 에러 출력 방지)
    event.preventDefault();
  });

  // 처리되지 않은 JavaScript 에러 처리
  window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);

    const error =
      event.error instanceof Error ? event.error : new Error(event.message || 'Unknown error');

    showError(error, {
      type: 'error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
}

// React Query Error Handler
export function createQueryErrorHandler() {
  const { showError } = useErrorStore.getState();

  return (error: any) => {
    console.log('Query error caught:', error);
    
    // ZodError 처리
    if (error?.name === 'ZodError') {
      const message = '서버 응답 형식이 올바르지 않습니다';
      const errorObj = new Error(message);
      errorObj.name = 'Validation Error';
      
      showError(errorObj, {
        source: 'react-query',
        zodIssues: error.issues,
        originalError: error.message,
      });
      return;
    }
    
    // AxiosError 처리
    if (error?.isAxiosError) {
      const message = error.response?.data?.message || error.message || '요청 중 오류가 발생했습니다';
      const errorObj = new Error(message);
      errorObj.name = `HTTP ${error.response?.status || 'Error'}`;
      
      showError(errorObj, {
        source: 'react-query',
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
      return;
    }
    
    // 일반 Error 처리
    showError(error instanceof Error ? error : new Error(String(error)), {
      source: 'react-query',
    });
  };
}
