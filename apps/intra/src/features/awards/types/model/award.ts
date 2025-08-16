export interface AwardProps {
  awardId?: number | null;
  memberId?: number | null;
  memberName?: string | null;
  handle?: string | null;
  organization?: string | null;
  awardName?: string | null;
  awardDetail?: string | null;
  awardDate?: string | null;
  isOfficial?: boolean | null;
}

export class Award {
  private readonly props: AwardProps;

  constructor(props: AwardProps) {
    this.props = { ...props };
  }

  get awardId(): number | null | undefined {
    return this.props.awardId;
  }

  get memberId(): number | null | undefined {
    return this.props.memberId;
  }

  get memberName(): string | null | undefined {
    return this.props.memberName;
  }

  get handle(): string | null | undefined {
    return this.props.handle;
  }

  get organization(): string | null | undefined {
    return this.props.organization;
  }

  get awardName(): string | null | undefined {
    return this.props.awardName;
  }

  get awardDetail(): string | null | undefined {
    return this.props.awardDetail;
  }

  get awardDate(): string | null | undefined {
    return this.props.awardDate;
  }

  get isOfficial(): boolean | null | undefined {
    return this.props.isOfficial;
  }

  equals(other?: Award): boolean {
    return Boolean(other) && this.props.awardId === other?.props.awardId;
  }

  compareTo(other: Award): number {
    return (
      new Date(other.props.awardDate ?? '').getTime() -
      new Date(this.props.awardDate ?? '').getTime()
    );
  }

  toJson(): AwardProps {
    return { ...this.props };
  }

  static fromJson(json: unknown): Award {
    const data: AwardProps = {
      awardId: json.awardId ?? null,
      memberId: json.memberId ?? null,
      memberName: json.memberName ?? null,
      handle: json.handle ?? null,
      organization: json.organization ?? null,
      awardName: json.awardName ?? null,
      awardDetail: json.awardDetail ?? null,
      awardDate: json.awardDate ?? null,
      isOfficial: json.isOfficial ?? null,
    };

    return new Award(data);
  }

  copyWith(updates: Partial<AwardProps>): Award {
    return new Award({
      ...this.props,
      ...updates,
    });
  }
}
