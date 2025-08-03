import { UserProfile } from '../../types/auth/user-profile';

// AuthActions 인터페이스 정의
export interface AuthActions {
  setUser(user: UserProfile | null): void;
  login(user: UserProfile): void;
  logout(): void;
  setLoading(loading: boolean): void;
  initialize(): Promise<void>;
  readonly isAuthenticated: boolean;
}

// AuthActions 검증 및 유틸리티
export class AuthActionsValidator {
  static validateSetUser(user: unknown): user is UserProfile {
    if (!user || typeof user !== 'object') {
      throw new Error('사용자 정보가 올바르지 않습니다');
    }

    const userObj = user as Record<string, unknown>;

    if (typeof userObj.id !== 'string' || !userObj.id.trim()) {
      throw new Error('사용자 ID가 필요합니다');
    }

    if (typeof userObj.email !== 'string' || !userObj.email.includes('@')) {
      throw new Error('올바른 이메일이 필요합니다');
    }

    if (typeof userObj.name !== 'string' || !userObj.name.trim()) {
      throw new Error('사용자 이름이 필요합니다');
    }

    return true;
  }

  static validateLogin(user: unknown): UserProfile {
    this.validateSetUser(user);
    return user as UserProfile;
  }

  static validateSetLoading(loading: unknown): loading is boolean {
    if (typeof loading !== 'boolean') {
      throw new Error('로딩 상태는 boolean 값이어야 합니다');
    }

    return true;
  }
}

// AuthActions 실행 전 검증을 포함한 Safe 버전
export interface SafeAuthActions {
  safeSetUser(user: unknown): { success: boolean; error?: string };
  safeLogin(user: unknown): { success: boolean; error?: string };
  safeSetLoading(loading: unknown): { success: boolean; error?: string };
}

export class SafeAuthActionsImpl implements SafeAuthActions {
  constructor(private actions: AuthActions) {}

  safeSetUser(user: unknown): { success: boolean; error?: string } {
    try {
      AuthActionsValidator.validateSetUser(user);
      this.actions.setUser(user as UserProfile);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
    }
  }

  safeLogin(user: unknown): { success: boolean; error?: string } {
    try {
      const validated = AuthActionsValidator.validateLogin(user);
      this.actions.login(validated);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
    }
  }

  safeSetLoading(loading: unknown): { success: boolean; error?: string } {
    try {
      AuthActionsValidator.validateSetLoading(loading);
      this.actions.setLoading(loading as boolean);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
    }
  }
}