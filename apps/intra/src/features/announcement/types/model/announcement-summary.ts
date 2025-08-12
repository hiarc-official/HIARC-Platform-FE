export interface AnnouncementSummaryProps {
  announcementId?: number | null;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null;
  title?: string | null;
  createdAt?: Date | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
}

export class AnnouncementSummary {
  private readonly props: AnnouncementSummaryProps;

  constructor(props: AnnouncementSummaryProps) {
    this.props = props;
  }

  get announcementId(): number | null {
    return this.props.announcementId ?? null;
  }

  get announcementType(): 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null {
    return this.props.announcementType ?? null;
  }

  get title(): string | null {
    return this.props.title ?? null;
  }

  get createdAt(): Date | null {
    return this.props.createdAt ?? null;
  }

  get studyId(): number | null {
    return this.props.studyId ?? null;
  }

  get studyName(): string | null {
    return this.props.studyName ?? null;
  }

  get lectureRound(): number | null {
    return this.props.lectureRound ?? null;
  }

  toJson(): any {
    return {
      announcementId: this.props.announcementId,
      announcementType: this.props.announcementType,
      title: this.props.title,
      createdAt: this.props.createdAt,
      studyId: this.props.studyId,
      studyName: this.props.studyName,
      lectureRound: this.props.lectureRound,
    };
  }

  static fromJson(json: any): AnnouncementSummary {
    return new AnnouncementSummary({
      announcementId: json?.announcementId ?? null,
      announcementType: json?.announcementType ?? null,
      title: json?.title ?? null,
      createdAt: json?.createdAt ? new Date(json.createdAt) : null,
      studyId: json?.studyId ?? null,
      studyName: json?.studyName ?? null,
      lectureRound: json?.lectureRound ?? null,
    });
  }

  copyWith(updates: Partial<AnnouncementSummaryProps>): AnnouncementSummary {
    return new AnnouncementSummary({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: AnnouncementSummary): boolean {
    return Boolean(other) && this.props.announcementId === other?.props.announcementId;
  }

  compareTo(other: AnnouncementSummary): number {
    const thisCreated = this.props.createdAt ? this.props.createdAt.getTime() : 0;
    const otherCreated = other.props.createdAt ? other.props.createdAt.getTime() : 0;
    return otherCreated - thisCreated;
  }
}
