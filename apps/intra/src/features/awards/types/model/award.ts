import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface AwardProps {
  awardId?: number;
  memberId?: number;
  memberName?: string;
  handle?: string;
  organization?: string;
  awardName?: string | null;
  awardDetail?: string | null;
  awardDate?: string;
  isOfficial?: boolean;
}

export class Award extends BaseModel<AwardProps> {
  static readonly schema = z.object({
    awardId: z.number().optional(),
    memberId: z.number().optional(),
    memberName: z.string().optional(),
    handle: z.string().optional(),
    organization: z.string().optional(),
    awardName: z.string().optional().nullable(),
    awardDetail: z.string().optional().nullable(),
    awardDate: z.string().optional(),
    isOfficial: z.boolean().optional(),
  });

  equals(other?: Award): boolean {
    return Boolean(other) && this.props.awardId === other?.props.awardId;
  }

  compareTo(other: Award): number {
    return (
      new Date(other.props.awardDate ?? '').getTime() -
      new Date(this.props.awardDate ?? '').getTime()
    );
  }

  get awardId(): number | undefined {
    return this.props.awardId;
  }

  get memberId(): number | undefined {
    return this.props.memberId;
  }

  get memberName(): string | undefined {
    return this.props.memberName;
  }

  get handle(): string | undefined {
    return this.props.handle;
  }

  get organization(): string | undefined {
    return this.props.organization;
  }

  get awardName(): string | undefined | null {
    return this.props.awardName;
  }

  get awardDetail(): string | undefined | null {
    return this.props.awardDetail;
  }

  get awardDate(): string | undefined {
    return this.props.awardDate;
  }

  get isOfficial(): boolean | undefined {
    return this.props.isOfficial;
  }
}
