export interface Member {
  id: string;
  username: string;
  email: string;
  name: string;
  bojHandle?: string;
  generation: number;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberProfile {
  id: string;
  username: string;
  name: string;
  bojHandle?: string;
  generation: number;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
  profileImageUrl?: string;
  bio?: string;
  totalStudies: number;
  currentStudies: number;
  completedStudies: number;
}

export interface MemberProfileResponse {
  bojHandle?: string;
  name: string;
  division: string;
  tier: string;
  introduction?: string;
}

export interface StreakInfoResponse {
  totalStreakDays: number;
  seasonStreakDays: number;
  streakStartDate: string;
}

export interface StreakHeatmapResponse {
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  solvedDates: string[];
}

export interface HitingScoreResponse {
  seasonScore: number;
  totalScore: number;
  todayScore: number;
}

export interface ExcellentSeasonResponse {
  seasonName: string;
  rank: number;
}

export interface AwardResponse {
  id: string;
  title: string;
  description: string;
  awardedAt: string;
}

export interface UpdateIntroductionRequest {
  introduction: string;
}

export interface PastStudyListResponse {
  studyId: string;
  studyName: string;
  semester: string;
  participationType: string;
  completedAt: string;
}

export interface CurrentStudyParticipantResponse {
  studyId: string;
  studyName: string;
  participationType: string;
  joinedAt: string;
  status: string;
}

export interface MemberQueryParams {
  page?: number;
  size?: number;
  sort?: 'name' | 'createdAt' | 'generation';
  direction?: 'asc' | 'desc';
  generation?: number;
  role?: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
  search?: string;
}

export interface PageableModel<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
