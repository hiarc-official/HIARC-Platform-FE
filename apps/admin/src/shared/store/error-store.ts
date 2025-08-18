import { create } from 'zustand';

export interface ErrorInfo {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  stack?: string;
  context?: Record<string, unknown>;
}

interface ErrorState {
  errors: ErrorInfo[];
  currentError: ErrorInfo | null;
  isDialogOpen: boolean;
  isHandling403: boolean;
  isHandling401: boolean;
}

interface ErrorActions {
  addError(error: Omit<ErrorInfo, 'id' | 'timestamp'>): void;
  showError(error: Error, context?: Record<string, unknown>): void;
  showMessage(title: string, message: string, type?: ErrorInfo['type']): void;
  clearError(id: string): void;
  clearCurrentError(): void;
  clearAllErrors(): void;
  openDialog(error: ErrorInfo): void;
  closeDialog(): void;
  set403Handling: (isHandling: boolean) => void;
  set401Handling: (isHandling: boolean) => void;
}

type ErrorStore = ErrorState & ErrorActions;

export const useErrorStore = create<ErrorStore>((set, get) => ({
  // State
  errors: [],
  currentError: null,
  isDialogOpen: false,
  isHandling403: false,
  isHandling401: false,

  // Actions
  addError: (errorInfo) => {
    const error: ErrorInfo = {
      ...errorInfo,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    set((state) => ({
      errors: [...state.errors, error],
    }));

    // 자동으로 다이얼로그 표시
    get().openDialog(error);
  },

  showError: (error, context) => {
    const errorInfo: Omit<ErrorInfo, 'id' | 'timestamp'> = {
      title: error.name || 'Error',
      message: error.message || '알 수 없는 오류가 발생했습니다',
      type: 'error',
      stack: error.stack,
      context,
    };

    get().addError(errorInfo);
  },

  showMessage: (title, message, type = 'info') => {
    const errorInfo: Omit<ErrorInfo, 'id' | 'timestamp'> = {
      title,
      message,
      type,
    };

    get().addError(errorInfo);
  },

  clearError: (id) => {
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
      currentError: state.currentError?.id === id ? null : state.currentError,
      isDialogOpen: state.currentError?.id === id ? false : state.isDialogOpen,
    }));
  },

  clearCurrentError: () => {
    const { currentError } = get();
    if (currentError) {
      get().clearError(currentError.id);
    }
  },

  clearAllErrors: () => {
    set({
      errors: [],
      currentError: null,
      isDialogOpen: false,
    });
  },

  openDialog: (error) => {
    set({
      currentError: error,
      isDialogOpen: true,
    });
  },

  closeDialog: () => {
    set({
      isDialogOpen: false,
    });
  },

  set403Handling: (isHandling) => {
    set({ isHandling403: isHandling });
  },

  set401Handling: (isHandling) => {
    set({ isHandling401: isHandling });
  },
}));