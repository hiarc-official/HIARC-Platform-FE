import { Recruitment, RecruitingMember } from '../model/recruitment';
import { PageableInfo } from '@hiarc-platform/shared';

// Recruitment Response Types
export interface RecruitmentDetailResponse {
  success: boolean;
  data: Recruitment;
  message?: string;
}

export interface RecruitmentCreateResponse {
  success: boolean;
  data: Recruitment;
  message?: string;
}

export interface RecruitmentUpdateResponse {
  success: boolean;
  data: Recruitment;
  message?: string;
}

export interface PageRecruitingMemberResponse {
  content: RecruitingMember[];
  pageable: PageableInfo;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface RecruitingMemberUpdateResponse {
  success: boolean;
  data: RecruitingMember;
  message?: string;
}