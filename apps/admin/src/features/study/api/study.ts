import { apiClient } from '@/shared/api/client';
import type {
  StudyResponse,
  StudyDetailResponse,
  PageAllStudyResponse,
  StudyStatusUpdateResponse,
  AssignMentorResponse,
} from '../types/response/study-response';
import type {
  CreateStudyRequest,
  UpdateStudyRequest,
  AssignMentorRequest,
  StudyQueryParams,
} from '../types/request/study-request';

export const studyApi = {
  // 모든 스터디 리스트 조회
  GET_ALL_STUDIES: async (params: StudyQueryParams = {}): Promise<PageAllStudyResponse> => {
    console.log('[STUDY API] GET_ALL_STUDIES 요청:', params);
    try {
      const response = await apiClient.get<PageAllStudyResponse>('/admin/studies', { params });
      console.log('[STUDY API] GET_ALL_STUDIES 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[STUDY API] GET_ALL_STUDIES 에러:', error);
      throw error;
    }
  },

  // 스터디 상세 조회
  GET_STUDY_DETAIL: async (studyId: number): Promise<StudyDetailResponse> => {
    console.log('[STUDY API] GET_STUDY_DETAIL 요청:', studyId);
    try {
      const response = await apiClient.get<StudyDetailResponse>(`/admin/studies/${studyId}`);
      console.log('[STUDY API] GET_STUDY_DETAIL 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_DETAIL 에러:', error);
      throw error;
    }
  },

  // 스터디 개설
  CREATE_STUDY: async (studyData: CreateStudyRequest): Promise<StudyResponse> => {
    console.log('[STUDY API] CREATE_STUDY 요청:', studyData);
    try {
      const response = await apiClient.post<StudyResponse>('/admin/studies', studyData);
      console.log('[STUDY API] CREATE_STUDY 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[STUDY API] CREATE_STUDY 에러:', error);
      throw error;
    }
  },

  // 스터디 정보 수정
  UPDATE_STUDY: async (studyId: number, studyData: UpdateStudyRequest): Promise<StudyResponse> => {
    console.log('[STUDY API] UPDATE_STUDY 요청:', { studyId, data: studyData });
    try {
      const response = await apiClient.put<StudyResponse>(`/admin/studies/${studyId}`, studyData);
      console.log('[STUDY API] UPDATE_STUDY 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[STUDY API] UPDATE_STUDY 에러:', error);
      throw error;
    }
  },

  // 스터디에 멘토 할당
  ASSIGN_MENTOR: async (studyId: number, mentorData: AssignMentorRequest): Promise<AssignMentorResponse> => {
    console.log('[STUDY API] ASSIGN_MENTOR 요청:', { studyId, mentorData });
    try {
      const response = await apiClient.post<AssignMentorResponse>(`/admin/studies/${studyId}/mentor`, mentorData);
      console.log('[STUDY API] ASSIGN_MENTOR 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[STUDY API] ASSIGN_MENTOR 에러:', error);
      throw error;
    }
  },

  // 스터디 선공개 (상태 변경)
  UPDATE_STUDY_STATUS: async (studyId: number): Promise<StudyStatusUpdateResponse> => {
    console.log('[STUDY API] UPDATE_STUDY_STATUS 요청:', studyId);
    try {
      const response = await apiClient.patch<StudyStatusUpdateResponse>(`/admin/studies/${studyId}/status`);
      console.log('[STUDY API] UPDATE_STUDY_STATUS 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[STUDY API] UPDATE_STUDY_STATUS 에러:', error);
      throw error;
    }
  },

  // 스터디 삭제
  DELETE_STUDY: async (studyId: number): Promise<void> => {
    console.log('[STUDY API] DELETE_STUDY 요청:', studyId);
    try {
      await apiClient.delete(`/admin/studies/${studyId}`);
      console.log('[STUDY API] DELETE_STUDY 성공');
    } catch (error) {
      console.error('[STUDY API] DELETE_STUDY 에러:', error);
      throw error;
    }
  },
};

// 타입들을 다시 export
export type * from '../types/model/study';
export type * from '../types/request/study-request';
export type * from '../types/response/study-response';