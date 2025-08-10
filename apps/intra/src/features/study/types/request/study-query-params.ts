export interface StudyQueryParams {
  page?: number;
  size?: number;
  category?: string;
  status?: 'active' | 'completed' | 'cancelled';
  authorId?: string;
  search?: string;
}