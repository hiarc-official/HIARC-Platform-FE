// Study Models
export interface Study {
  studyId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  currentParticipants: number;
  status: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  mentorId?: number;
  mentorName?: string;
  semesterId: number;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  createdAt: string;
  updatedAt: string;
}

export interface StudyDetail extends Study {
  participants: StudyParticipant[];
  lectures: StudyLecture[];
}

export interface StudyParticipant {
  memberId: number;
  memberName: string;
  bojHandle: string;
  joinedAt: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DROPPED';
}

export interface StudyLecture {
  lectureId: number;
  title: string;
  content: string;
  lectureDate: string;
  createdAt: string;
}