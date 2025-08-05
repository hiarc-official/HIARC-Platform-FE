import { AuthState, AuthStateSchema } from '@/shared/auth';
import { LoginResponse, LoginResponseSchema } from './login-response';
import { UserProfile, UserProfileSchema } from './user-profile';

// User Profile exports
export { UserProfileModel, UserProfileSchema, type UserProfile } from './user-profile';

// Auth State, Actions, Store exports have been moved to /shared/auth/
// These files are deprecated and were removed. Use the new structure instead.

// Login Response exports
export { LoginResponseModel, LoginResponseSchema, type LoginResponse } from './login-response';

// Common validation utilities
export class AuthValidationUtils {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidToken(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false;
    }

    // JWT 기본 형식 검증
    const parts = token.split('.');
    return parts.length === 3 && parts.every((part) => part.length > 0);
  }

  static isValidUserId(id: string): boolean {
    return typeof id === 'string' && id.trim().length > 0;
  }

  static isValidUserName(name: string): boolean {
    return typeof name === 'string' && name.trim().length > 0 && name.trim().length <= 100;
  }

  static sanitizeUserName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  static maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) {
      return email;
    }

    const maskedLocal =
      localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
  }
}

// Error classes
export class AuthValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'AuthValidationError';
  }
}

export class AuthTokenError extends Error {
  constructor(message: string = '토큰이 유효하지 않습니다') {
    super(message);
    this.name = 'AuthTokenError';
  }
}

export class AuthUserError extends Error {
  constructor(message: string = '사용자 정보가 유효하지 않습니다') {
    super(message);
    this.name = 'AuthUserError';
  }
}

// Type guards
export const isUserProfile = (value: unknown): value is UserProfile => {
  try {
    UserProfileSchema.parse(value);
    return true;
  } catch {
    return false;
  }
};

export const isAuthState = (value: unknown): value is AuthState => {
  try {
    AuthStateSchema.parse(value);
    return true;
  } catch {
    return false;
  }
};

export const isLoginResponse = (value: unknown): value is LoginResponse => {
  try {
    LoginResponseSchema.parse(value);
    return true;
  } catch {
    return false;
  }
};
