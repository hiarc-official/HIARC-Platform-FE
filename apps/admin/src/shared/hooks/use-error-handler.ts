import { useCallback } from 'react';

import { GlobalErrorHandler } from '../utils/global-error-handler';
import { DialogUtil } from '@hiarc-platform/ui';

export interface UseErrorHandlerReturn {
  handleError(error: Error, context?: Record<string, unknown>): void;
  showMessage(title: string, message: string, type?: 'error' | 'warning' | 'info'): void;
  showSuccess(message: string): void;
  showWarning(message: string): void;
  showInfo(message: string): void;
  clearErrors(): void;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const handleError = useCallback((error: Error, context?: Record<string, unknown>) => {
    console.log('🔥 [USE ERROR HANDLER] Error context:', context);
    GlobalErrorHandler.handleError(error);
  }, []);

  const handleShowMessage = useCallback(
    (title: string, message: string, type: 'error' | 'warning' | 'info' = 'info') => {
      switch (type) {
        case 'error':
          DialogUtil.showError(message, title);
          break;
        case 'warning':
          DialogUtil.showWarning(message, title);
          break;
        case 'info':
        default:
          DialogUtil.showInfo(message, title);
          break;
      }
    },
    []
  );

  const showSuccess = useCallback((message: string) => {
    DialogUtil.showSuccess(message, '성공');
  }, []);

  const showWarning = useCallback((message: string) => {
    DialogUtil.showWarning(message, '주의');
  }, []);

  const showInfo = useCallback((message: string) => {
    DialogUtil.showInfo(message, '알림');
  }, []);

  const clearErrors = useCallback(() => {
    DialogUtil.hideAllDialogs();
  }, []);

  return {
    handleError,
    showMessage: handleShowMessage,
    showSuccess,
    showWarning,
    showInfo,
    clearErrors,
  };
}

// Global error handler (이제 GlobalErrorHandler에서 처리)
export function setupGlobalErrorHandler(): void {
  console.log('🌍 [SETUP] Global error handler initialized with DialogUtil');
}

// React Query Error Handler
export function createQueryErrorHandler() {
  return (error: any) => {
    console.log('🚨 [REACT QUERY] Error caught:', error);
    GlobalErrorHandler.handleError(error);
  };
}
