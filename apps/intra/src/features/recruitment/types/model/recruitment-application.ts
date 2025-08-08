import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface RecruitmentApplicationProps {
  id: string;
  applicantName: string;
  applicantEmail: string;
  bojHandle: string | undefined;
  motivation: string;
  experience: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: Date;
  reviewedAt: Date | undefined;
  reviewedBy: string | undefined;
}

export class RecruitmentApplication extends BaseModel<RecruitmentApplicationProps> {
  static readonly schema = z.object({
    id: z.string(),
    applicantName: z.string(),
    applicantEmail: z.string(),
    bojHandle: z.string().optional(),
    motivation: z.string(),
    experience: z.string(),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
    submittedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    reviewedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ).optional(),
    reviewedBy: z.string().optional(),
  });

  get isPending(): boolean {
    return this.props.status === 'PENDING';
  }

  get isApproved(): boolean {
    return this.props.status === 'APPROVED';
  }

  get isRejected(): boolean {
    return this.props.status === 'REJECTED';
  }

  equals(other?: RecruitmentApplication): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: RecruitmentApplication): number {
    return other.props.submittedAt.getTime() - this.props.submittedAt.getTime();
  }
}