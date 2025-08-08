import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface ScheduleProps {
  id: string;
  title: string;
  description: string | undefined;
  startTime: Date;
  endTime: Date;
  location: string | undefined;
  type: 'STUDY' | 'EVENT' | 'MEETING' | 'EXAM';
  studyId: string | undefined;
  studyTitle: string | undefined;
  instructorId: string | undefined;
  instructorName: string | undefined;
  attendees: Array<{
    memberId: string;
    memberName: string;
    isPresent?: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export class Schedule extends BaseModel<ScheduleProps> {
  static readonly schema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    startTime: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    endTime: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    location: z.string().optional(),
    type: z.enum(['STUDY', 'EVENT', 'MEETING', 'EXAM']),
    studyId: z.string().optional(),
    studyTitle: z.string().optional(),
    instructorId: z.string().optional(),
    instructorName: z.string().optional(),
    attendees: z.array(z.object({
      memberId: z.string(),
      memberName: z.string(),
      isPresent: z.boolean().optional(),
    })),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    updatedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  get isUpcoming(): boolean {
    return this.props.startTime > new Date();
  }

  get isOngoing(): boolean {
    const now = new Date();
    return this.props.startTime <= now && this.props.endTime > now;
  }

  get isCompleted(): boolean {
    return this.props.endTime < new Date();
  }

  equals(other?: Schedule): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Schedule): number {
    return this.props.startTime.getTime() - other.props.startTime.getTime();
  }
}