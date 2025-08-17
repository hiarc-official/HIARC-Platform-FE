export interface UpdateStudyRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  capacity?: number;
  category?: string;
  mentorId?: number;
}

export interface AssignMentorRequest {
  mentorId: number;
}

export interface StudyQueryParams {
  semesterId?: number;
  page?: number;
  size?: number;
  title?: string;
}
