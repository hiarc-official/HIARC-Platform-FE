export interface RatingRecordProps {
  description?: string | null;
  division?: 'DIV_1' | 'DIV_2' | 'DIV_3' | null;
  ranking?: number | null;
}

export class RatingRecord {
  private readonly props: RatingRecordProps;

  constructor(props: RatingRecordProps) {
    this.props = { ...props };
  }

  get description(): string | null | undefined {
    return this.props.description;
  }

  get division(): 'DIV_1' | 'DIV_2' | 'DIV_3' | null | undefined {
    return this.props.division;
  }

  get ranking(): number | null | undefined {
    return this.props.ranking;
  }

  equals(other?: RatingRecord): boolean {
    return (
      Boolean(other) &&
      this.props.description === other?.props.description &&
      this.props.division === other?.props.division &&
      this.props.ranking === other?.props.ranking
    );
  }

  compareTo(other: RatingRecord): number {
    const thisRanking = this.props.ranking ?? 0;
    const otherRanking = other.props.ranking ?? 0;
    return thisRanking - otherRanking;
  }

  toJson(): RatingRecordProps {
    return { ...this.props };
  }

  static fromJson(json: unknown): RatingRecord {
    const raw = (json || {}) as Record<string, unknown>;
    const data: RatingRecordProps = {
      description: (raw.description as string | null | undefined) ?? null,
      division: (raw.division as RatingRecordProps['division']) ?? null,
      ranking: (raw.ranking as number | null | undefined) ?? null,
    };

    return new RatingRecord(data);
  }

  copyWith(updates: Partial<RatingRecordProps>): RatingRecord {
    return new RatingRecord({
      ...this.props,
      ...updates,
    });
  }
}
