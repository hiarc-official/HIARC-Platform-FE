import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface UserProps {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'kakao' | 'naver';
  createdAt: Date;
}

export class User extends BaseModel<UserProps> {
  static readonly schema = z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string().min(1),
    provider: z.enum(['google', 'kakao', 'naver']),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: User): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: User): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}
