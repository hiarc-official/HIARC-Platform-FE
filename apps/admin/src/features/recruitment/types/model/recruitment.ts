// Recruitment Models
export interface Recruitment {
  recruitmentId: number;
  semesterId: number;
  startDate: string;
  endDate: string;
  recruitmentText: string;
  maxCapacity: number;
  currentApplicants: number;
  status: 'PREPARING' | 'RECRUITING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface RecruitingMember {
  memberId: number;
  memberName: string;
  bojHandle: string;
  email: string;
  phoneNumber?: string;
  university: string;
  major: string;
  grade: number;
  applicationText: string;
  applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedAt: string;
  reviewedAt?: string;
  reviewerId?: number;
  reviewerName?: string;
  reviewComment?: string;
}