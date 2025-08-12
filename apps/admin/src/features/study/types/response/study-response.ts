import { Study, StudyDetail } from '../model/study';
import { PageableInfo } from '@hiarc-platform/shared';

// Study Response Types
export interface StudyResponse {
  success: boolean;
  data: Study;
  message?: string;
}

export interface StudyDetailResponse {
  success: boolean;
  data: StudyDetail;
  message?: string;
}

export interface PageAllStudyResponse {
  content: Study[];
  pageable: PageableInfo;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface StudyStatusUpdateResponse {
  success: boolean;
  message: string;
}

export interface AssignMentorResponse {
  success: boolean;
  data: {
    studyId: number;
    mentorId: number;
    mentorName: string;
  };
  message?: string;
}