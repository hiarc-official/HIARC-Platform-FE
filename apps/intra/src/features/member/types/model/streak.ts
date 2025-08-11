import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';
import { StreakData } from './streak-data';

export interface StreakProps extends Record<string, unknown> {
  today: string;
  streakData: StreakData[];
}

export class Streak extends BaseModel<StreakProps> {
  static readonly schema = z.object({
    today: z.string(),
    streakData: z.array(z.instanceof(StreakData)),
  });

  get today(): string {
    return this.props.today;
  }

  get streakData(): StreakData[] {
    return this.props.streakData;
  }

  equals(other?: Streak): boolean {
    return Boolean(other) && this.props.today === other?.props.today;
  }

  compareTo(other: Streak): number {
    return new Date(this.props.today).getTime() - new Date(other.props.today).getTime();
  }
}