export interface AnnouncementNavigationItem {
  announcementId?: number | null;
  title?: string | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
}

export interface Announcement {
  announcementId?: number | null;
  title?: string | null;
  place?: string | null;
  scheduleStartAt?: Date | null;
  scheduleEndAt?: Date | null;
  content?: string | null;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null;
  authorId?: number | null;
  authorName?: string | null;
  createdAt?: Date | null;
  applicationUrl?: string | null;
  applicationStartAt?: Date | null;
  applicationEndAt?: Date | null;
  attachmentUrls?: string[] | null;
  imageUrls?: string[] | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
  isPublic?: boolean | null;
  semesterId?: number | null;
  prev?: AnnouncementNavigationItem | null;
  next?: AnnouncementNavigationItem | null;

  announcementTitle: string;
}

export const Announcement = {
  fromJson(json: unknown): Announcement {
    const data = (json || {}) as Record<string, unknown>;
    const announcement = {
      announcementId: (data.announcementId as number) || null,
      title: (data.title as string) || null,
      place: (data.place as string) || null,
      scheduleStartAt: data.scheduleStartAt ? new Date(data.scheduleStartAt as string) : null,
      scheduleEndAt: data.scheduleEndAt ? new Date(data.scheduleEndAt as string) : null,
      content: (data.content as string) || null,
      announcementType: (data.announcementType as Announcement['announcementType']) || null,
      authorId: (data.authorId as number) || null,
      authorName: (data.authorName as string) || null,
      createdAt: data.createdAt ? new Date(data.createdAt as string) : null,
      applicationUrl: (data.applicationUrl as string) || null,
      applicationStartAt: data.applicationStartAt
        ? new Date(data.applicationStartAt as string)
        : null,
      applicationEndAt: data.applicationEndAt ? new Date(data.applicationEndAt as string) : null,
      attachmentUrls: (data.attachmentUrls as string[]) || null,
      imageUrls: (data.imageUrls as string[]) || null,
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      lectureRound: (data.lectureRound as number) || null,
      isPublic: (data.isPublic as boolean) ?? null,
      semesterId: (data.semesterId as number) || null,
      prev: (data.prev as AnnouncementNavigationItem) || null,
      next: (data.next as AnnouncementNavigationItem) || null,

      get announcementTitle(): string {
        if (!this.title) return '';

        if (this.announcementType === 'STUDY') {
          if (this.lectureRound !== null && this.lectureRound !== undefined) {
            return `[${this.studyName}][${this.lectureRound}회차] ${this.title}`;
          }
          return `[${this.studyName}] ${this.title}`;
        }

        return this.title;
      },
    };

    return announcement;
  },
};
