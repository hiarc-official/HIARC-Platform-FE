import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface RatingRecordProps extends Record<string, unknown> {
  description: string;
  division: 'DIV_1' | 'DIV_2' | 'DIV_3';
  ranking: number;
}

export class RatingRecord extends BaseModel<RatingRecordProps> {
  static readonly schema = z.object({
    description: z.string(),
    division: z.enum(['DIV_1', 'DIV_2', 'DIV_3']),
    ranking: z.number(),
  });

  get description(): string {
    return this.props.description;
  }

  get division(): 'DIV_1' | 'DIV_2' | 'DIV_3' {
    return this.props.division;
  }

  get ranking(): number {
    return this.props.ranking;
  }

  equals(other?: RatingRecord): boolean {
    return Boolean(other) && 
      this.props.description === other?.props.description &&
      this.props.division === other?.props.division &&
      this.props.ranking === other?.props.ranking;
  }

  compareTo(other: RatingRecord): number {
    return this.props.ranking - other.props.ranking;
  }
}