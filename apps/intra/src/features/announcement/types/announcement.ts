// API Response 타입들
export interface AnnouncementResponse {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'study' | 'rating' | 'etc' | 'external';
  author: string;
  createdAt: string;
  updatedAt: string;
  isImportant: boolean;
  viewCount: number;
}

export interface AnnouncementListItem {
  id: string;
  title: string;
  category: 'general' | 'study' | 'rating' | 'etc' | 'external';
  author: string;
  createdAt: string;
  isImportant: boolean;
  viewCount: number;
}

export interface AnnouncementListResponse {
  content: AnnouncementListItem[];
  pageable: {
    page: number;
    size: number;
    sort: string[];
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Request 타입들
export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  category: 'general' | 'study' | 'rating' | 'etc' | 'external';
  isImportant?: boolean;
}

export interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
  category?: 'general' | 'study' | 'rating' | 'etc' | 'external';
  isImportant?: boolean;
}

export interface AnnouncementQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  announcementType?: string;
  semesterId?: number;
  title?: string;
}
