import { StreakData } from './streak-data';

export interface StreakProps {
  today?: string | null;
  streakData?: StreakData[] | null;
}

export class Streak {
  private readonly props: StreakProps;

  constructor(props: StreakProps) {
    this.props = props;
  }

  get today(): string | null {
    return this.props.today ?? null;
  }

  get streakData(): StreakData[] | null {
    return this.props.streakData ?? null;
  }

  toJson(): any {
    return {
      today: this.props.today,
      streakData: this.props.streakData?.map(data => data.toJson()) ?? null,
    };
  }

  static fromJson(json: any): Streak {
    return new Streak({
      today: json?.today ?? null,
      streakData: json?.streakData ? json.streakData.map((data: any) => StreakData.fromJson(data)) : null,
    });
  }

  copyWith(updates: Partial<StreakProps>): Streak {
    return new Streak({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: Streak): boolean {
    return Boolean(other) && this.props.today === other?.props.today;
  }

  compareTo(other: Streak): number {
    const thisToday = this.props.today ? new Date(this.props.today).getTime() : 0;
    const otherToday = other.props.today ? new Date(other.props.today).getTime() : 0;
    return thisToday - otherToday;
  }
}