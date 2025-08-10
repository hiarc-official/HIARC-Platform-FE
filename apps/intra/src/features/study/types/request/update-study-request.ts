export interface UpdateStudyRequest {
  title?: string;
  description?: string;
  category?: string;
  status?: 'active' | 'completed' | 'cancelled';
  maxParticipants?: number;
  startDate?: Date;
  endDate?: Date;
}