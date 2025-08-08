import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface StudySummaryProps {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'active' | 'completed' | 'cancelled';
  currentParticipants: number;
  maxParticipants: number;
  createdAt: Date;
}

export class StudySummary extends BaseModel<StudySummaryProps> {
  static readonly schema = z.object({
    id: z.uuid(),
    title: z.string().min(1),
    author: z.string().min(1),
    category: z.string().min(1),
    status: z.enum(['active', 'completed', 'cancelled']),
    currentParticipants: z.number().int().min(0),
    maxParticipants: z.number().int().min(1),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: StudySummary): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: StudySummary): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}