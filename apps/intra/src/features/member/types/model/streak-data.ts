import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface StreakDataProps extends Record<string, unknown> {
  date: string;
  value: boolean;
}

export class StreakData extends BaseModel<StreakDataProps> {
  static readonly schema = z.object({
    date: z.string(),
    value: z.boolean(),
  });

  get date(): string {
    return this.props.date;
  }

  get value(): boolean {
    return this.props.value;
  }

  equals(other?: StreakData): boolean {
    return Boolean(other) && this.props.date === other?.props.date;
  }

  compareTo(other: StreakData): number {
    return new Date(this.props.date).getTime() - new Date(other.props.date).getTime();
  }
}