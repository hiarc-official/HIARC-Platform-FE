import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';
import { RatingRecord } from './rating-record';

export interface RatingProps extends Record<string, unknown> {
  seasonScore: number;
  totalScore: number;
  todayScore: number;
  records: RatingRecord[];
}

export class Rating extends BaseModel<RatingProps> {
  static readonly schema = z.object({
    seasonScore: z.number(),
    totalScore: z.number(),
    todayScore: z.number(),
    records: z.array(z.instanceof(RatingRecord)),
  });

  get seasonScore(): number {
    return this.props.seasonScore;
  }

  get totalScore(): number {
    return this.props.totalScore;
  }

  get todayScore(): number {
    return this.props.todayScore;
  }

  get records(): RatingRecord[] {
    return this.props.records;
  }

  equals(other?: Rating): boolean {
    return Boolean(other) && 
      this.props.seasonScore === other?.props.seasonScore &&
      this.props.totalScore === other?.props.totalScore &&
      this.props.todayScore === other?.props.todayScore;
  }

  compareTo(other: Rating): number {
    return other.props.totalScore - this.props.totalScore; // 높은 점수가 우선
  }
}