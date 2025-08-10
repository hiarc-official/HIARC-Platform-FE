import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface AwardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  organization: string;
  awardDate: Date;
  rank: string | undefined;
  certificateUrl: string | undefined;
  isPublic: boolean;
  memberId: string;
  memberName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Award extends BaseModel<AwardProps> {
  static readonly schema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    organization: z.string(),
    awardDate: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    rank: z.string().optional(),
    certificateUrl: z.string().optional(),
    isPublic: z.boolean(),
    memberId: z.string(),
    memberName: z.string(),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    updatedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: Award): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Award): number {
    return other.props.awardDate.getTime() - this.props.awardDate.getTime();
  }
}