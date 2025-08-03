import { z } from 'zod';
import { UserProfile, UserProfileSchema } from './user-profile';

// Zod 스키마 정의
export const LoginResponseSchema = z.object({
  success: z.boolean(),
  token: z.string().optional(),
  needSignup: z.boolean().optional(),
  user: UserProfileSchema.optional(),
  message: z.string().optional(),
  error: z.string().optional(),
});

// TypeScript 타입 추론
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// LoginResponse 모델 클래스
export class LoginResponseModel {
  private constructor(private data: LoginResponse) {}

  static create(data: unknown): LoginResponseModel {
    const validatedData = LoginResponseSchema.parse(data);
    return new LoginResponseModel(validatedData);
  }

  static safeParse(
    data: unknown
  ): { success: true; data: LoginResponseModel } | { success: false; error: z.ZodError } {
    const result = LoginResponseSchema.safeParse(data);
    if (result.success) {
      return { success: true, data: new LoginResponseModel(result.data) };
    }
    return { success: false, error: result.error };
  }

  static createSuccess(user: UserProfile, token: string, message?: string): LoginResponseModel {
    return new LoginResponseModel({
      success: true,
      user,
      token,
      needSignup: false,
      message,
    });
  }

  static createNeedSignup(message?: string): LoginResponseModel {
    return new LoginResponseModel({
      success: true,
      needSignup: true,
      message: message || '회원가입이 필요합니다',
    });
  }

  static createError(error: string): LoginResponseModel {
    return new LoginResponseModel({
      success: false,
      error,
    });
  }

  get success(): boolean {
    return this.data.success;
  }

  get token(): string | undefined {
    return this.data.token;
  }

  get needSignup(): boolean {
    return this.data.needSignup ?? false;
  }

  get user(): UserProfile | undefined {
    return this.data.user;
  }

  get message(): string | undefined {
    return this.data.message;
  }

  get error(): string | undefined {
    return this.data.error;
  }

  get isSuccessWithUser(): boolean {
    return this.data.success && Boolean(this.data.user) && Boolean(this.data.token);
  }

  get isSuccessWithSignup(): boolean {
    return this.data.success && this.data.needSignup === true;
  }

  get isError(): boolean {
    return !this.data.success || Boolean(this.data.error);
  }

  get hasValidLoginData(): boolean {
    return this.isSuccessWithUser;
  }

  getLoginData(): { user: UserProfile } | null {
    if (this.hasValidLoginData && this.data.user) {
      return {
        user: this.data.user,
      };
    }
    return null;
  }

  getErrorMessage(): string {
    if (this.data.error) {
      return this.data.error;
    }
    if (!this.data.success) {
      return '로그인에 실패했습니다';
    }
    return '';
  }

  toJSON(): LoginResponse {
    return { ...this.data };
  }

  // 유틸리티 메서드들
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.data.success) {
      if (this.data.needSignup) {
        // 회원가입 필요한 경우는 token과 user가 없어도 됨
      } else {
        // 로그인 성공인 경우 token과 user가 필요
        if (!this.data.token) {
          errors.push('성공 응답에는 토큰이 필요합니다');
        }
        if (!this.data.user) {
          errors.push('성공 응답에는 사용자 정보가 필요합니다');
        }
      }
    } else {
      // 실패인 경우 error 메시지가 있어야 함
      if (!this.data.error) {
        errors.push('실패 응답에는 오류 메시지가 필요합니다');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
