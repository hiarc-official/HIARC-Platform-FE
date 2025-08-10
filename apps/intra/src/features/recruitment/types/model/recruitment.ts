import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface RecruitmentProps {
  id: string;
  title: string;
  description: string;
  generation: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  maxApplications: number;
  currentApplications: number;
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Recruitment extends BaseModel<RecruitmentProps> {
  static readonly schema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    generation: z.number(),
    startDate: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    endDate: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    isActive: z.boolean(),
    maxApplications: z.number(),
    currentApplications: z.number(),
    requirements: z.array(z.string()),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    updatedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  get isApplicationOpen(): boolean {
    const now = new Date();
    return this.props.isActive && now >= this.props.startDate && now <= this.props.endDate;
  }

  get isApplicationFull(): boolean {
    return this.props.currentApplications >= this.props.maxApplications;
  }

  equals(other?: Recruitment): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Recruitment): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}