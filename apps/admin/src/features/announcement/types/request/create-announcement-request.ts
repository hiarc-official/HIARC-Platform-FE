export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  place?: string;
  scheduledAt?: string;
  announcementType: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL';
  applicationUrl?: string;
  applicationStartAt?: string;
  applicationEndAt?: string;
  attachmentUrls?: string[];
  imageUrls?: string[];
  studyId?: number;
  lectureRound?: number;
  isImportant?: boolean;
  isPublished?: boolean;
}