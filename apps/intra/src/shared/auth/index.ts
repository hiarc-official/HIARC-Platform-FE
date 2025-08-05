import { UserProfile } from '../types/auth';
import { AuthActions } from './actions/auth-actions';
import { AuthState } from './state/auth-state';

// Actions
export { AuthActionsValidator, SafeAuthActionsImpl } from './actions/auth-actions';
export type { AuthActions, SafeAuthActions } from './actions/auth-actions';

// State
export { AuthStateModel, AuthStateSchema } from './state/auth-state';
export type { AuthState } from './state/auth-state';

// Types
export type { UserProfile } from '../types/auth/user-profile';

// Store
export { useAuthStore } from '../store/auth-store';

// Combined types for auth store
export interface AuthStore extends AuthState, AuthActions {
  // State properties (explicitly defined for clarity)
  user: UserProfile | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions (explicitly defined for clarity)
  setUser(user: UserProfile | null): void;
  login(user: UserProfile): void;
  logout(): void;
  setLoading(loading: boolean): void;
  initialize(): Promise<void>;

  // Computed property
  readonly isAuthenticated: boolean;
}
