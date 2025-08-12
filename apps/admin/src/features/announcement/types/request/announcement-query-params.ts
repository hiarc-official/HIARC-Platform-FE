export interface AnnouncementQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  isImportant?: boolean;
  isPublished?: boolean;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL';
  authorId?: number;
  dateFrom?: string;
  dateTo?: string;
}