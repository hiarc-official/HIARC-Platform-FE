// Recruitment Request Types
export interface RecruitmentCreateRequest {
  startDate: string;
  endDate: string;
  recruitmentText: string;
  maxCapacity: number;
}

export interface RecruitmentUpdateRequest {
  startDate?: string;
  endDate?: string;
  recruitmentText?: string;
  maxCapacity?: number;
}

export interface RecruitingMemberUpdateRequest {
  applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewComment?: string;
}

export interface RecruitmentQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  applicationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  memberName?: string;
  university?: string;
  major?: string;
}