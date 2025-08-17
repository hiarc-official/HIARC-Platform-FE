import { apiClient } from '@/shared/api/client';
import type { UpdateStudyRequest, StudyQueryParams } from '../types/request/study-request';
import {
  CreateStudyRequest,
  Lecture,
  PageableModel,
  Study,
  StudySummary,
} from '@hiarc-platform/shared';
import { StudyInitialForm } from '../types';
import { AnnouncementSummary } from '@/features/announcement/types/model/announcement_summary';

export const studyApi = {
  // 모든 스터디 리스트 조회
  GET_ALL_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    console.log('[STUDY API] GET_ALL_STUDIES 요청:', params);
    try {
      const response = await apiClient.get<PageableModel<StudySummary>>('/admin/studies', {
        params,
      });
      return PageableModel.fromJson(response.data, StudySummary);
    } catch (error) {
      console.error('[STUDY API] GET_ALL_STUDIES 에러:', error);
      throw error;
    }
  },

  // 스터디 상세 조회
  GET_STUDY_DETAIL: async (studyId: number): Promise<Study> => {
    console.log('[STUDY API] GET_STUDY_DETAIL 요청:', studyId);
    try {
      const response = await apiClient.get<Study>(`/studies/${studyId}`);
      console.log('[STUDY API] GET_STUDY_DETAIL 응답:', response.data);
      return Study.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_DETAIL 에러:', error);
      throw error;
    }
  },

  // 스터디 개설 정보 조회
  GET_STUDY_INITIAL_FORM: async (studyId: number): Promise<StudyInitialForm> => {
    console.log('[STUDY API] GET_STUDY_INITIAL_FORM 요청:', studyId);
    try {
      const response = await apiClient.get<Study>(`/admin/studies/${studyId}`);
      console.log('[STUDY API] GET_STUDY_INITIAL_FORM 응답:', response.data);
      return StudyInitialForm.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_INITIAL_FORM 에러:', error);
      throw error;
    }
  },

  // 스터디 개설
  CREATE_STUDY: async (studyData: CreateStudyRequest): Promise<Study> => {
    console.log('[STUDY API] CREATE_STUDY 요청:', studyData);
    try {
      const response = await apiClient.post<Study>('/admin/studies', studyData);
      console.log('[STUDY API] CREATE_STUDY 응답:', response.data);
      return Study.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] CREATE_STUDY 에러:', error);
      throw error;
    }
  },

  // 스터디 정보 수정
  UPDATE_STUDY: async (studyId: number, studyData: UpdateStudyRequest): Promise<void> => {
    console.log('[STUDY API] UPDATE_STUDY 요청:', { studyId, data: studyData });
    await apiClient.patch<Study>(`/admin/studies/${studyId}`, studyData);
  },

  GET_STUDY_ANNOUNCEMENT_LIST: async (
    studyId: number,
    page: number = 0,
    size: number = 10
  ): Promise<PageableModel<AnnouncementSummary>> => {
    console.log('[STUDY API] GET_STUDY_ANNOUNCEMENT_LIST 요청');
    try {
      const response = await apiClient.get<PageableModel<AnnouncementSummary>>(
        `/studies/${studyId}/announcements`,
        {
          params: {
            page,
            size,
          },
        }
      );
      return PageableModel.fromJson(response.data, AnnouncementSummary);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_ANNOUNCEMENT_LIST 에러:', error);
      throw error;
    }
  },

  GET_LECTURES_BY_STUDY: async (studyId: number): Promise<Lecture[]> => {
    console.log('[STUDY API] GET_LECTURES_BY_STUDY 요청:', studyId);
    try {
      const response = await apiClient.get(`/studies/${studyId}/lectures`);
      console.log('[STUDY API] GET_LECTURES_BY_STUDY 응답:', response.data);
      return response.data.map((lecture: unknown) => Lecture.fromJson(lecture));
    } catch (error) {
      console.error('[STUDY API] GET_LECTURES_BY_STUDY 에러:', error);
      throw error;
    }
  },
};

export type * from '../types/request/study-request';
export type * from '../types/response/study-response';
