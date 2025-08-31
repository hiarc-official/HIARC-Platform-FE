import { ImageSource } from './announcement';

export interface CreateAnnouncementForm {
  title: string;
  place?: string;
  scheduleStartAt?: Date | string;
  scheduleEndAt?: Date | string;
  content: string;
  announcementType: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | 'LECTURE';
  applicationUrl?: string | null;
  applicationStartAt?: Date | string | null;
  applicationEndAt?: Date | string | null;
  isPublic: boolean;
  studyId?: number;
  lectureRound?: number;
  images?: File[];
  imageSources?: ImageSource[];
  attachmentUrls?: string[];
  applyType?: string;
  studyAnnounceType?: string;
  publicType?: string;

}
