import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface MemberProfileProps {
  id: string;
  username: string;
  name: string;
  bojHandle: string | undefined;
  generation: number;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
  profileImageUrl: string | undefined;
  bio: string | undefined;
  totalStudies: number;
  currentStudies: number;
  completedStudies: number;
}

export class MemberProfile extends BaseModel<MemberProfileProps> {
  static readonly schema = z.object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
    bojHandle: z.string().optional(),
    generation: z.number(),
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED']),
    profileImageUrl: z.string().optional(),
    bio: z.string().optional(),
    totalStudies: z.number(),
    currentStudies: z.number(),
    completedStudies: z.number(),
  });

  equals(other?: MemberProfile): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: MemberProfile): number {
    return this.props.username.localeCompare(other.props.username);
  }
}