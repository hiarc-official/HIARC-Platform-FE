interface AnnouncementNavigationItem {
  announcementId?: number | null;
  title?: string | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
}

export interface AnnouncementProps {
  announcementId?: number | null;
  title?: string | null;
  place?: string | null;
  scheduledAt?: Date | null;
  content?: string | null;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null;
  createdAt?: Date | null;
  applicationUrl?: string | null;
  applicationStartAt?: string | null;
  applicationEndAt?: string | null;
  attachmentUrls?: string[] | null;
  imageUrls?: string[] | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
  prev?: AnnouncementNavigationItem | null;
  next?: AnnouncementNavigationItem | null;
}

export class Announcement {
  private readonly props: AnnouncementProps;

  constructor(props: AnnouncementProps) {
    this.props = props;
  }

  get announcementId(): number | null {
    return this.props.announcementId ?? null;
  }

  get title(): string | null {
    return this.props.title ?? null;
  }

  get place(): string | null {
    return this.props.place ?? null;
  }

  get scheduledAt(): Date | null {
    return this.props.scheduledAt ?? null;
  }

  get content(): string | null {
    return this.props.content ?? null;
  }

  get announcementType(): 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null {
    return this.props.announcementType ?? null;
  }

  get createdAt(): Date | null {
    return this.props.createdAt ?? null;
  }

  get applicationUrl(): string | null {
    return this.props.applicationUrl ?? null;
  }

  get applicationStartAt(): string | null {
    return this.props.applicationStartAt ?? null;
  }

  get applicationEndAt(): string | null {
    return this.props.applicationEndAt ?? null;
  }

  get attachmentUrls(): string[] | null {
    return this.props.attachmentUrls ?? null;
  }

  get imageUrls(): string[] | null {
    return this.props.imageUrls ?? null;
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

  get prev(): AnnouncementNavigationItem | null {
    return this.props.prev ?? null;
  }

  get next(): AnnouncementNavigationItem | null {
    return this.props.next ?? null;
  }

  toJson(): any {
    return {
      announcementId: this.props.announcementId,
      title: this.props.title,
      place: this.props.place,
      scheduledAt: this.props.scheduledAt,
      content: this.props.content,
      announcementType: this.props.announcementType,
      createdAt: this.props.createdAt,
      applicationUrl: this.props.applicationUrl,
      applicationStartAt: this.props.applicationStartAt,
      applicationEndAt: this.props.applicationEndAt,
      attachmentUrls: this.props.attachmentUrls,
      imageUrls: this.props.imageUrls,
      studyId: this.props.studyId,
      studyName: this.props.studyName,
      lectureRound: this.props.lectureRound,
      prev: this.props.prev,
      next: this.props.next,
    };
  }

  static fromJson(json: any): Announcement {
    return new Announcement({
      announcementId: json?.announcementId ?? null,
      title: json?.title ?? null,
      place: json?.place ?? null,
      scheduledAt: json?.scheduledAt ? new Date(json.scheduledAt) : null,
      content: json?.content ?? null,
      announcementType: json?.announcementType ?? null,
      createdAt: json?.createdAt ? new Date(json.createdAt) : null,
      applicationUrl: json?.applicationUrl ?? null,
      applicationStartAt: json?.applicationStartAt ?? null,
      applicationEndAt: json?.applicationEndAt ?? null,
      attachmentUrls: json?.attachmentUrls ?? null,
      imageUrls: json?.imageUrls ?? null,
      studyId: json?.studyId ?? null,
      studyName: json?.studyName ?? null,
      lectureRound: json?.lectureRound ?? null,
      prev: json?.prev ?? null,
      next: json?.next ?? null,
    });
  }

  copyWith(updates: Partial<AnnouncementProps>): Announcement {
    return new Announcement({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: Announcement): boolean {
    return Boolean(other) && this.props.announcementId === other?.props.announcementId;
  }

  compareTo(other: Announcement): number {
    const thisCreated = this.props.createdAt ? this.props.createdAt.getTime() : 0;
    const otherCreated = other.props.createdAt ? other.props.createdAt.getTime() : 0;
    return otherCreated - thisCreated;
  }
}