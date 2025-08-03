'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { useErrorStore } from '../store/error-store';

interface Props {
  children: ReactNode;
  fallback?(error: Error, errorInfo: ErrorInfo): ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });

    // ErrorStore에 에러 추가
    const showError = useErrorStore.getState().showError;
    showError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    // 개발 모드에서 콘솔에 상세 정보 출력
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo!);
      }

      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <h2 className="text-red-600 mb-4 text-xl font-bold">문제가 발생했습니다</h2>
            <p className="mb-4 text-gray-600">
              예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              페이지 새로고침
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  개발자 정보 (개발 모드에서만 표시)
                </summary>
                <pre className="text-red-500 mt-2 overflow-auto text-xs">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook을 사용하는 wrapper 컴포넌트
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?(error: Error, errorInfo: ErrorInfo): ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps): JSX.Element {
  return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
}
