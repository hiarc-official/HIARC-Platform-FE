import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface StudyProps extends Record<string, unknown> {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  category: string;
  status: 'active' | 'completed' | 'cancelled';
  maxParticipants: number;
  currentParticipants: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Study extends BaseModel<StudyProps> {
  static readonly schema = z.object({
    id: z.uuid(),
    title: z.string().min(1),
    description: z.string(),
    authorId: z.uuid(),
    authorName: z.string().min(1),
    category: z.string().min(1),
    status: z.enum(['active', 'completed', 'cancelled']),
    maxParticipants: z.number().int().min(1),
    currentParticipants: z.number().int().min(0),
    startDate: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    endDate: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    updatedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: Study): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Study): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}