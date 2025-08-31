export interface CreateAnnouncementRequest {
  title: string;
  place?: string;
  scheduleStartAt?: Date | string | null;
  scheduleEndAt?: Date | string | null;
  content: string;
  announcementType: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | 'LECTURE';
  applicationUrl?: string | null;
  applicationStartAt?: Date | string | null;
  applicationEndAt?: Date | string | null;
  isPublic: boolean;
  studyId?: number | null;
  lectureRound?: number | null;
  imageKeys?: string[] | null;
  attachmentUrls?: string[] | null;
}
