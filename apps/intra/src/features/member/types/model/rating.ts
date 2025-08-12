import { RatingRecord } from './rating-record';

export interface RatingProps {
  seasonScore?: number | null;
  totalScore?: number | null;
  todayScore?: number | null;
  records?: RatingRecord[] | null;
}

export class Rating {
  private readonly props: RatingProps;

  constructor(props: RatingProps) {
    this.props = props;
  }

  get seasonScore(): number | null {
    return this.props.seasonScore ?? null;
  }

  get totalScore(): number | null {
    return this.props.totalScore ?? null;
  }

  get todayScore(): number | null {
    return this.props.todayScore ?? null;
  }

  get records(): RatingRecord[] | null {
    return this.props.records ?? null;
  }

  toJson(): any {
    return {
      seasonScore: this.props.seasonScore,
      totalScore: this.props.totalScore,
      todayScore: this.props.todayScore,
      records: this.props.records?.map(record => record.toJson()) ?? null,
    };
  }

  static fromJson(json: any): Rating {
    return new Rating({
      seasonScore: json?.seasonScore ?? null,
      totalScore: json?.totalScore ?? null,
      todayScore: json?.todayScore ?? null,
      records: json?.records ? json.records.map((record: any) => RatingRecord.fromJson(record)) : null,
    });
  }

  copyWith(updates: Partial<RatingProps>): Rating {
    return new Rating({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: Rating): boolean {
    return Boolean(other) && 
      this.props.seasonScore === other?.props.seasonScore &&
      this.props.totalScore === other?.props.totalScore &&
      this.props.todayScore === other?.props.todayScore;
  }

  compareTo(other: Rating): number {
    const thisTotalScore = this.props.totalScore ?? 0;
    const otherTotalScore = other.props.totalScore ?? 0;
    return otherTotalScore - thisTotalScore; // 높은 점수가 우선
  }
}