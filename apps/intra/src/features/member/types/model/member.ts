import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface MemberProps {
  id: string;
  username: string;
  email: string;
  name: string;
  bojHandle: string | undefined;
  generation: number;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
  createdAt: Date;
  updatedAt: Date;
}

export class Member extends BaseModel<MemberProps> {
  static readonly schema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    name: z.string(),
    bojHandle: z.string().optional(),
    generation: z.number(),
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED']),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    updatedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: Member): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Member): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}