import { z } from 'zod';

// Zod 스키마 정의
export const UserProfileSchema = z.object({
  id: z.string().min(1, '사용자 ID는 필수입니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  name: z.string().min(1, '이름은 필수입니다').max(100, '이름은 100자 이하여야 합니다'),
  image: z.string().url('올바른 URL 형식이 아닙니다').optional(),
});

// TypeScript 타입 추론
export type UserProfile = z.infer<typeof UserProfileSchema>;

// 유틸리티 함수들
export class UserProfileModel {
  private constructor(private data: UserProfile) {}

  static create(data: unknown): UserProfileModel {
    const validatedData = UserProfileSchema.parse(data);
    return new UserProfileModel(validatedData);
  }

  static safeParse(
    data: unknown
  ): { success: true; data: UserProfileModel } | { success: false; error: z.ZodError } {
    const result = UserProfileSchema.safeParse(data);
    if (result.success) {
      return { success: true, data: new UserProfileModel(result.data) };
    }
    return { success: false, error: result.error };
  }

  get id(): string {
    return this.data.id;
  }

  get email(): string {
    return this.data.email;
  }

  get name(): string {
    return this.data.name;
  }

  get image(): string | undefined {
    return this.data.image;
  }

  get displayName(): string {
    return this.data.name;
  }

  get initials(): string {
    return this.data.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  hasImage(): boolean {
    return Boolean(this.data.image);
  }

  toJSON(): UserProfile {
    return { ...this.data };
  }

  equals(other: UserProfile | UserProfileModel): boolean {
    const otherData = other instanceof UserProfileModel ? other.toJSON() : other;
    return this.data.id === otherData.id;
  }
}
