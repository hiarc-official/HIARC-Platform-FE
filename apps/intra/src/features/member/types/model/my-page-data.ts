import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';
import { Award } from '@/features/awards/types/model/award';
import { Rating } from './rating';
import { Streak } from './streak';

export interface MyPageDataProps extends Record<string, unknown> {
  bojHandle: string;
  name: string;
  division: 'DIV_1' | 'DIV_2' | 'DIV_3' | null;
  tier:
    | 'UNRATED'
    | 'BRONZE'
    | 'SILVER'
    | 'GOLD'
    | 'PLATINUM'
    | 'DIAMOND'
    | 'RUBY'
    | 'MASTER'
    | null;
  introduction: string | null;
  rating: Rating | null;
  streak: Streak | null;
  award: Award[];
}

export class MyPageData extends BaseModel<MyPageDataProps> {
  constructor(props: MyPageDataProps) {
    console.log('[MyPageData] Constructor called with props:', props);
    super(props);
    console.log('[MyPageData] Instance created with awards:', this.props.award);
  }

  static readonly schema = z.object({
    bojHandle: z.string().min(1),
    name: z.string().min(1),
    division: z.enum(['DIV_1', 'DIV_2', 'DIV_3']).nullable(),
    tier: z
      .enum(['UNRATED', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'RUBY', 'MASTER'])
      .nullable(),
    introduction: z.string().nullable(),
    rating: z.instanceof(Rating).nullable(),
    streak: z.instanceof(Streak).nullable(),
    award: z.array(z.instanceof(Award)),
  });

  get bojHandle(): string {
    return this.props.bojHandle;
  }

  get name(): string {
    return this.props.name;
  }

  get division(): 'DIV_1' | 'DIV_2' | 'DIV_3' | null {
    return this.props.division;
  }

  get tier():
    | 'UNRATED'
    | 'BRONZE'
    | 'SILVER'
    | 'GOLD'
    | 'PLATINUM'
    | 'DIAMOND'
    | 'RUBY'
    | 'MASTER'
    | null {
    return this.props.tier;
  }

  get introduction(): string | null {
    return this.props.introduction;
  }

  get rating(): Rating | null {
    return this.props.rating;
  }

  get streak(): Streak | null {
    return this.props.streak;
  }

  get awards(): Award[] {
    return this.props.award;
  }

  equals(other?: MyPageData): boolean {
    return Boolean(other) && this.props.bojHandle === other?.props.bojHandle;
  }

  compareTo(other: MyPageData): number {
    return this.props.name.localeCompare(other.props.name);
  }
}
