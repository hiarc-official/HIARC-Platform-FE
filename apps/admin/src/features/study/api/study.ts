import { apiClient } from '@/shared/api/client';
import type { UpdateStudyRequest, StudyQueryParams } from '../types/request/study-request';
import {
  Assignment,
  CreateStudyRequest,
  Lecture,
  PageableModel,
  Study,
  StudyMember,
  StudySummary,
} from '@hiarc-platform/shared';
import { StudyInitialForm } from '../types';
import { AnnouncementSummary } from '@/features/announcement/types/model/announcement_summary';
import { CreateAssignmentRequest } from '../types/request/create-assignment-request';

export const studyApi = {
  // 모든 스터디 리스트 조회
  GET_ALL_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
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
    try {
      const response = await apiClient.get<Study>(`/studies/${studyId}`);
      return Study.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_DETAIL 에러:', error);
      throw error;
    }
  },

  // 스터디 개설 정보 조회
  GET_STUDY_INITIAL_FORM: async (studyId: number): Promise<StudyInitialForm> => {
    try {
      const response = await apiClient.get<Study>(`/admin/studies/${studyId}`);
      return StudyInitialForm.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_INITIAL_FORM 에러:', error);
      throw error;
    }
  },

  // 스터디 개설
  CREATE_STUDY: async (studyData: CreateStudyRequest): Promise<Study> => {
    try {
      const response = await apiClient.post<Study>('/admin/studies', studyData);
      return Study.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] CREATE_STUDY 에러:', error);
      throw error;
    }
  },

  // 스터디 정보 수정
  UPDATE_STUDY: async (studyId: number, studyData: UpdateStudyRequest): Promise<void> => {
    await apiClient.patch<Study>(`/admin/studies/${studyId}`, studyData);
  },

  GET_STUDY_ANNOUNCEMENT_LIST: async (
    studyId: number,
    page: number = 0,
    size: number = 10
  ): Promise<PageableModel<AnnouncementSummary>> => {
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
    try {
      const response = await apiClient.get(`/studies/${studyId}/lecture`);
      return response.data.map((lecture: unknown) => Lecture.fromJson(lecture));
    } catch (error) {
      console.error('[STUDY API] GET_LECTURES_BY_STUDY 에러:', error);
      throw error;
    }
  },

  GET_STUDY_MEMBERS: async (studyId: number): Promise<StudyMember[]> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/instructor/status`);
      return response.data.map((member: unknown) => StudyMember.fromJson(member));
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_MEMBERS 에러:', error);
      throw error;
    }
  },

  CREATE_ASSIGNMENT: async (
    studyId: number,
    lectureId: number,
    data: CreateAssignmentRequest
  ): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/assignment`, data);
    } catch (error) {
      console.error('[STUDY API] CREATE_ASSIGNMENT 에러:', error);
      throw error;
    }
  },

  GET_ASSIGNMENT: async (studyId: number, lectureId: number): Promise<Assignment> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/lecture/${lectureId}/assignment`);
      return Assignment.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_ASSIGNMENT 에러:', error);
      throw error;
    }
  },

  CREATE_ATTENDANCE_CODE: async (
    studyId: number,
    lectureId: number,
    code: string
  ): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/attendance`, {
        code,
      });
    } catch (error) {
      console.error('[STUDY API] CREATE_ATTENDANCE_CODE 에러:', error);
      throw error;
    }
  },

  GET_ATTENDANCE_CODE: async (studyId: number, lectureId: number): Promise<string> => {
    try {
      const response = await apiClient.get(
        `/studies/${studyId}/instructor/lecture/${lectureId}/attendance`
      );
      return response.data.code;
    } catch (error) {
      console.error('[STUDY API] GET_ATTENDANCE_CODE 에러:', error);
      throw error;
    }
  },
};

export type * from '../types/request/study-request';
export type * from '../types/response/study-response';
