// API
export { apiClient } from './api/client';

// Base classes
export { BaseException } from './base/base-exception';
export { BaseModel } from './base/base-model';

// Components
export { ErrorBoundary } from './components/error-boundary';
export { GlobalDialogContainer } from '@hiarc-platform/ui';
export { default as SharedFooter } from './components/ui/Footer';
export { default as SharedHeader } from './components/ui/header';

// Exceptions
export * from './exceptions/server-exception';

// Hooks
export { useErrorHandler } from './hooks/use-error-handler';

// Providers
export { Providers } from './providers/providers';

// Stores
export { useAuthStore } from './store/auth-store';
export { useErrorStore } from './store/error-store';

// Types
export * from './types/pageable-model';

// Utils
export { DialogUtil } from '@hiarc-platform/ui';
export { GlobalErrorHandler } from './utils/global-error-handler';