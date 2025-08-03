import { z } from 'zod';
import { UserProfile, UserProfileSchema } from '../../types/auth/user-profile';

// Zod 스키마 정의
export const AuthStateSchema = z.object({
  user: UserProfileSchema.nullable(),
  isLoading: z.boolean().default(false),
  isInitialized: z.boolean().default(false),
});

// TypeScript 타입 추론
export type AuthState = z.infer<typeof AuthStateSchema>;

// AuthState 모델 클래스
export class AuthStateModel {
  private constructor(private data: AuthState) {}

  static create(data: unknown): AuthStateModel {
    const validatedData = AuthStateSchema.parse(data);
    return new AuthStateModel(validatedData);
  }

  static createInitial(): AuthStateModel {
    return new AuthStateModel({
      user: null,
      isLoading: false,
      isInitialized: false,
    });
  }

  static safeParse(
    data: unknown
  ): { success: true; data: AuthStateModel } | { success: false; error: z.ZodError } {
    const result = AuthStateSchema.safeParse(data);
    if (result.success) {
      return { success: true, data: new AuthStateModel(result.data) };
    }
    return { success: false, error: result.error };
  }

  get user(): UserProfile | null {
    return this.data.user;
  }


  get isLoading(): boolean {
    return this.data.isLoading;
  }

  get isInitialized(): boolean {
    return this.data.isInitialized;
  }

  get isAuthenticated(): boolean {
    return Boolean(this.data.user);
  }

  get isUnauthenticated(): boolean {
    return !this.isAuthenticated;
  }

  get isReady(): boolean {
    return this.data.isInitialized && !this.data.isLoading;
  }

  withUser(user: UserProfile | null): AuthStateModel {
    return new AuthStateModel({
      ...this.data,
      user,
    });
  }


  withLoading(isLoading: boolean): AuthStateModel {
    return new AuthStateModel({
      ...this.data,
      isLoading,
    });
  }

  withInitialized(isInitialized: boolean): AuthStateModel {
    return new AuthStateModel({
      ...this.data,
      isInitialized,
    });
  }

  withLogin(user: UserProfile): AuthStateModel {
    return new AuthStateModel({
      ...this.data,
      user,
      isLoading: false,
    });
  }

  withLogout(): AuthStateModel {
    return new AuthStateModel({
      ...this.data,
      user: null,
      isLoading: false,
    });
  }

  toJSON(): AuthState {
    return { ...this.data };
  }
}