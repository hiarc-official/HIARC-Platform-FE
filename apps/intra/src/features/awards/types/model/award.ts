import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface AwardProps {
  awardId: number;
  memberId: number;
  memberName: string;
  handle: string;
  organization: string;
  awardName: string;
  awardDetail: string;
  awardDate: string;
  isOfficial: boolean;
}

export class Award extends BaseModel<AwardProps> {
  static readonly schema = z.object({
    awardId: z.number(),
    memberId: z.number(),
    memberName: z.string(),
    handle: z.string(),
    organization: z.string(),
    awardName: z.string(),
    awardDetail: z.string(),
    awardDate: z.string(),
    isOfficial: z.boolean().optional().default(false),
  });

  equals(other?: Award): boolean {
    return Boolean(other) && this.props.awardId === other?.props.awardId;
  }

  compareTo(other: Award): number {
    return new Date(other.props.awardDate).getTime() - new Date(this.props.awardDate).getTime();
  }

  get awardId(): number {
    return this.props.awardId;
  }
  get memberId(): number {
    return this.props.memberId;
  }
  get memberName(): string {
    return this.props.memberName;
  }
  get handle(): string {
    return this.props.handle;
  }
  get organization(): string {
    return this.props.organization;
  }
  get awardName(): string {
    return this.props.awardName;
  }
  get awardDetail(): string {
    return this.props.awardDetail;
  }
  get awardDate(): string {
    return this.props.awardDate;
  }
  get isOfficial(): boolean {
    return this.props.isOfficial ?? false;
  }
}
