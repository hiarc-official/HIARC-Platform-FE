export interface CreateAnnouncementRequest {
  title: string;
  place?: string;
  scheduleStartAt?: string;
  scheduleEndAt?: string;
  content: string;
  announcementType: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL';
  applicationUrl?: string;
  applicationStartAt?: string;
  applicationEndAt?: string;
  isPublic: boolean;
  studyId?: number;
  lectureRound?: number;
  imageKeys?: string[];
  attachmentUrls?: string[];
}
