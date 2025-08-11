// Study Request Types
export interface CreateStudyRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  semesterId: number;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  mentorId?: number;
}

export interface UpdateStudyRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  capacity?: number;
  category?: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  mentorId?: number;
}

export interface AssignMentorRequest {
  mentorId: number;
}

export interface StudyQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  status?: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  semesterId?: number;
  category?: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  title?: string;
}