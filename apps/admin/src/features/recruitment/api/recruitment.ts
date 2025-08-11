import { apiClient } from '@/shared/api/client';
import type {
  RecruitmentDetailResponse,
  RecruitmentCreateResponse,
  RecruitmentUpdateResponse,
  PageRecruitingMemberResponse,
  RecruitingMemberUpdateResponse,
} from '../types/response/recruitment-response';
import type {
  RecruitmentCreateRequest,
  RecruitmentUpdateRequest,
  RecruitingMemberUpdateRequest,
  RecruitmentQueryParams,
} from '../types/request/recruitment-request';

export const recruitmentApi = {
  // 학회원 모집 정보 조회
  GET_RECRUITMENT: async (semesterId: number): Promise<RecruitmentDetailResponse> => {
    console.log('[RECRUITMENT API] GET_RECRUITMENT 요청:', semesterId);
    try {
      const response = await apiClient.get<RecruitmentDetailResponse>(`/admin/recruitment/${semesterId}`);
      console.log('[RECRUITMENT API] GET_RECRUITMENT 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[RECRUITMENT API] GET_RECRUITMENT 에러:', error);
      throw error;
    }
  },

  // 학회원 모집 시작
  CREATE_RECRUITMENT: async (semesterId: number, recruitmentData: RecruitmentCreateRequest): Promise<RecruitmentCreateResponse> => {
    console.log('[RECRUITMENT API] CREATE_RECRUITMENT 요청:', { semesterId, recruitmentData });
    try {
      const response = await apiClient.post<RecruitmentCreateResponse>(`/admin/recruitment/${semesterId}`, recruitmentData);
      console.log('[RECRUITMENT API] CREATE_RECRUITMENT 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[RECRUITMENT API] CREATE_RECRUITMENT 에러:', error);
      throw error;
    }
  },

  // 학회원 모집 정보 수정
  UPDATE_RECRUITMENT: async (semesterId: number, recruitmentData: RecruitmentUpdateRequest): Promise<RecruitmentUpdateResponse> => {
    console.log('[RECRUITMENT API] UPDATE_RECRUITMENT 요청:', { semesterId, recruitmentData });
    try {
      const response = await apiClient.patch<RecruitmentUpdateResponse>(`/admin/recruitment/${semesterId}`, recruitmentData);
      console.log('[RECRUITMENT API] UPDATE_RECRUITMENT 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[RECRUITMENT API] UPDATE_RECRUITMENT 에러:', error);
      throw error;
    }
  },

  // 학회원 신청 목록 조회
  GET_RECRUITING_MEMBERS: async (semesterId: number, params: RecruitmentQueryParams = {}): Promise<PageRecruitingMemberResponse> => {
    console.log('[RECRUITMENT API] GET_RECRUITING_MEMBERS 요청:', { semesterId, params });
    try {
      const response = await apiClient.get<PageRecruitingMemberResponse>(`/admin/recruitment/${semesterId}/members`, { params });
      console.log('[RECRUITMENT API] GET_RECRUITING_MEMBERS 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[RECRUITMENT API] GET_RECRUITING_MEMBERS 에러:', error);
      throw error;
    }
  },

  // 학회원 신청 상태 변경
  UPDATE_RECRUITING_MEMBER_STATUS: async (
    semesterId: number,
    memberId: number,
    statusData: RecruitingMemberUpdateRequest
  ): Promise<RecruitingMemberUpdateResponse> => {
    console.log('[RECRUITMENT API] UPDATE_RECRUITING_MEMBER_STATUS 요청:', { semesterId, memberId, statusData });
    try {
      const response = await apiClient.patch<RecruitingMemberUpdateResponse>(
        `/admin/recruitment/${semesterId}/members/${memberId}`,
        statusData
      );
      console.log('[RECRUITMENT API] UPDATE_RECRUITING_MEMBER_STATUS 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[RECRUITMENT API] UPDATE_RECRUITING_MEMBER_STATUS 에러:', error);
      throw error;
    }
  },

  // 학회원 모집 종료
  END_RECRUITMENT: async (semesterId: number): Promise<RecruitmentUpdateResponse> => {
    console.log('[RECRUITMENT API] END_RECRUITMENT 요청:', semesterId);
    try {
      const response = await apiClient.patch<RecruitmentUpdateResponse>(`/admin/recruitment/${semesterId}/end`);
      console.log('[RECRUITMENT API] END_RECRUITMENT 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[RECRUITMENT API] END_RECRUITMENT 에러:', error);
      throw error;
    }
  },
};

// 타입들을 다시 export
export type * from '../types/model/recruitment';
export type * from '../types/request/recruitment-request';
export type * from '../types/response/recruitment-response';