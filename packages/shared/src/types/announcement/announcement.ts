import { DateTime } from 'luxon';

export interface AnnouncementNavigationItem {
  announcementId?: number;
  title?: string;
  studyId?: number;
  studyName?: string;
  lectureRound?: number;
}

export interface ImageSource {
  resourceKey?: string;
  url?: string;
}

export interface Announcement {
  announcementId?: number;
  title?: string;
  place?: string;
  scheduleStartAt?: Date;
  scheduleEndAt?: Date;
  content?: string;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL';
  authorId?: number;
  authorName?: string;
  createdAt?: Date;
  applicationUrl?: string;
  applicationStartAt?: Date;
  applicationEndAt?: Date;
  attachmentUrls?: string[];
  imageUrls?: ImageSource[];
  studyId?: number;
  studyName?: string;
  lectureRound?: number;
  isPublic?: boolean;
  semesterId?: number;
  prev?: AnnouncementNavigationItem;
  next?: AnnouncementNavigationItem;

  readonly announcementTitle?: string;
}

export const Announcement = {
  fromJson(json: unknown): Announcement {
    const data = (json || {}) as Record<string, unknown>;
    const announcement = {
      announcementId: (data.announcementId as number) || undefined,
      title: data.title as string,
      place: (data.place as string) || undefined,
      scheduleStartAt: data.scheduleStartAt
        ? DateTime.fromISO(data.scheduleStartAt as string).toJSDate()
        : undefined,
      scheduleEndAt: data.scheduleEndAt
        ? DateTime.fromISO(data.scheduleEndAt as string).toJSDate()
        : undefined,
      content: (data.content as string) || undefined,
      announcementType: (data.announcementType as Announcement['announcementType']) || undefined,
      authorId: (data.authorId as number) || undefined,
      authorName: (data.authorName as string) || undefined,
      createdAt: data.createdAt ? DateTime.fromISO(data.createdAt as string).toJSDate() : undefined,
      applicationUrl: (data.applicationUrl as string) || undefined,
      applicationStartAt: data.applicationStartAt
        ? DateTime.fromISO(data.applicationStartAt as string).toJSDate()
        : undefined,
      applicationEndAt: data.applicationEndAt
        ? DateTime.fromISO(data.applicationEndAt as string).toJSDate()
        : undefined,
      attachmentUrls: (data.attachmentUrls as string[]) || undefined,
      imageUrls: (data.imageUrls as ImageSource[]) || undefined,
      studyId: (data.studyId as number) || undefined,
      studyName: (data.studyName as string) || undefined,
      lectureRound: (data.lectureRound as number) || undefined,
      isPublic: (data.isPublic as boolean) ?? undefined,
      semesterId: (data.semesterId as number) || undefined,
      prev: (data.prev as AnnouncementNavigationItem) || undefined,
      next: (data.next as AnnouncementNavigationItem) || undefined,
    };

    return { ...announcement, announcementTitle: this.getAnnouncementTitle(announcement) };
  },

  getAnnouncementTitle(announcement: Announcement): string {
    if (!announcement.title) {
      return '';
    }

    if (announcement.announcementType === 'STUDY') {
      if (announcement.lectureRound !== undefined) {
        return `[${announcement.studyName}][${announcement.lectureRound}회차] ${announcement.title}`;
      }
      return `[${announcement.studyName}] ${announcement.title}`;
    }

    return announcement.title;
  },
};
