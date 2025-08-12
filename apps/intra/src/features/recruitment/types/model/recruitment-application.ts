export interface RecruitmentApplicationProps {
  id?: string | null;
  applicantName?: string | null;
  applicantEmail?: string | null;
  bojHandle?: string | null;
  motivation?: string | null;
  experience?: string | null;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | null;
  submittedAt?: Date | null;
  reviewedAt?: Date | null;
  reviewedBy?: string | null;
}

export class RecruitmentApplication {
  private readonly props: RecruitmentApplicationProps;

  constructor(props: RecruitmentApplicationProps) {
    this.props = props;
  }

  get id(): string | null {
    return this.props.id ?? null;
  }

  get applicantName(): string | null {
    return this.props.applicantName ?? null;
  }

  get applicantEmail(): string | null {
    return this.props.applicantEmail ?? null;
  }

  get bojHandle(): string | null {
    return this.props.bojHandle ?? null;
  }

  get motivation(): string | null {
    return this.props.motivation ?? null;
  }

  get experience(): string | null {
    return this.props.experience ?? null;
  }

  get status(): 'PENDING' | 'APPROVED' | 'REJECTED' | null {
    return this.props.status ?? null;
  }

  get submittedAt(): Date | null {
    return this.props.submittedAt ?? null;
  }

  get reviewedAt(): Date | null {
    return this.props.reviewedAt ?? null;
  }

  get reviewedBy(): string | null {
    return this.props.reviewedBy ?? null;
  }

  get isPending(): boolean {
    return this.props.status === 'PENDING';
  }

  get isApproved(): boolean {
    return this.props.status === 'APPROVED';
  }

  get isRejected(): boolean {
    return this.props.status === 'REJECTED';
  }

  toJson(): any {
    return {
      id: this.props.id,
      applicantName: this.props.applicantName,
      applicantEmail: this.props.applicantEmail,
      bojHandle: this.props.bojHandle,
      motivation: this.props.motivation,
      experience: this.props.experience,
      status: this.props.status,
      submittedAt: this.props.submittedAt,
      reviewedAt: this.props.reviewedAt,
      reviewedBy: this.props.reviewedBy,
    };
  }

  static fromJson(json: any): RecruitmentApplication {
    return new RecruitmentApplication({
      id: json?.id ?? null,
      applicantName: json?.applicantName ?? null,
      applicantEmail: json?.applicantEmail ?? null,
      bojHandle: json?.bojHandle ?? null,
      motivation: json?.motivation ?? null,
      experience: json?.experience ?? null,
      status: json?.status ?? null,
      submittedAt: json?.submittedAt ? new Date(json.submittedAt) : null,
      reviewedAt: json?.reviewedAt ? new Date(json.reviewedAt) : null,
      reviewedBy: json?.reviewedBy ?? null,
    });
  }

  copyWith(updates: Partial<RecruitmentApplicationProps>): RecruitmentApplication {
    return new RecruitmentApplication({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: RecruitmentApplication): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: RecruitmentApplication): number {
    const thisSubmitted = this.props.submittedAt ? this.props.submittedAt.getTime() : 0;
    const otherSubmitted = other.props.submittedAt ? other.props.submittedAt.getTime() : 0;
    return otherSubmitted - thisSubmitted;
  }
}