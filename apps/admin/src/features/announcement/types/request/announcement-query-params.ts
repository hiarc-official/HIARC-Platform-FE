export interface AnnouncementQueryParams {
  page?: number;
  size?: number;
  sort?: string[];
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL';
  semesterId?: number;
  title?: string;
  isPublic?: boolean;
}
