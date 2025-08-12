export interface RecruitmentProps {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  generation?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  isActive?: boolean | null;
  maxApplications?: number | null;
  currentApplications?: number | null;
  requirements?: string[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Recruitment {
  private readonly props: RecruitmentProps;

  constructor(props: RecruitmentProps) {
    this.props = props;
  }

  get id(): string | null {
    return this.props.id ?? null;
  }

  get title(): string | null {
    return this.props.title ?? null;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get generation(): number | null {
    return this.props.generation ?? null;
  }

  get startDate(): Date | null {
    return this.props.startDate ?? null;
  }

  get endDate(): Date | null {
    return this.props.endDate ?? null;
  }

  get isActive(): boolean | null {
    return this.props.isActive ?? null;
  }

  get maxApplications(): number | null {
    return this.props.maxApplications ?? null;
  }

  get currentApplications(): number | null {
    return this.props.currentApplications ?? null;
  }

  get requirements(): string[] | null {
    return this.props.requirements ?? null;
  }

  get createdAt(): Date | null {
    return this.props.createdAt ?? null;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  get isApplicationOpen(): boolean {
    const now = new Date();
    return Boolean(this.props.isActive && this.props.startDate && this.props.endDate && 
      now >= this.props.startDate && now <= this.props.endDate);
  }

  get isApplicationFull(): boolean {
    return Boolean(this.props.currentApplications && this.props.maxApplications && 
      this.props.currentApplications >= this.props.maxApplications);
  }

  toJson(): any {
    return {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      generation: this.props.generation,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      isActive: this.props.isActive,
      maxApplications: this.props.maxApplications,
      currentApplications: this.props.currentApplications,
      requirements: this.props.requirements,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  static fromJson(json: any): Recruitment {
    return new Recruitment({
      id: json?.id ?? null,
      title: json?.title ?? null,
      description: json?.description ?? null,
      generation: json?.generation ?? null,
      startDate: json?.startDate ? new Date(json.startDate) : null,
      endDate: json?.endDate ? new Date(json.endDate) : null,
      isActive: json?.isActive ?? null,
      maxApplications: json?.maxApplications ?? null,
      currentApplications: json?.currentApplications ?? null,
      requirements: json?.requirements ?? null,
      createdAt: json?.createdAt ? new Date(json.createdAt) : null,
      updatedAt: json?.updatedAt ? new Date(json.updatedAt) : null,
    });
  }

  copyWith(updates: Partial<RecruitmentProps>): Recruitment {
    return new Recruitment({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: Recruitment): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Recruitment): number {
    const thisCreated = this.props.createdAt ? this.props.createdAt.getTime() : 0;
    const otherCreated = other.props.createdAt ? other.props.createdAt.getTime() : 0;
    return otherCreated - thisCreated;
  }
}