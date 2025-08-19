import { apiClient } from '../../../shared/api/client';

import { CreateStudyRequest } from '../types/request/create-study-request';
import { UpdateStudyRequest } from '../types/request/update-study-request';
import { StudyQueryParams } from '../types/request/study-query-params';
import {
  Announcement,
  AnnouncementSummary,
  Assignment,
  CreateAssignmentRequest,
  Lecture,
  PageableModel,
  Study,
  StudyMember,
  StudySummary,
} from '@hiarc-platform/shared';

export const studyApi = {
  // 스터디 목록 조회 (페이지네이션)
  GET_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    const response = await apiClient.get('/studies', { params });
    return PageableModel.fromJson(response.data, StudySummary);
  },

  // 스터디 상세 조회
  GET_STUDY: async (id: number): Promise<Study> => {
    const response = await apiClient.get(`/studies/${id}`);
    return Study.fromJson(response.data);
  },

  // 스터디 생성
  CREATE_STUDY: async (studyData: CreateStudyRequest): Promise<void> => {
    await apiClient.post('/studies', studyData);
  },

  // 스터디 정보 수정
  UPDATE_STUDY: async (studyId: number, studyData: UpdateStudyRequest): Promise<void> => {
    await apiClient.patch<Study>(`/admin/studies/${studyId}`, studyData);
  },

  // 스터디 신청하기
  APPLY_TO_STUDY: async (studyId: string): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/application`);
  },

  GET_STUDY_LECTURE: async (studyId: string): Promise<Lecture[]> => {
    const response = await apiClient.get(`/studies/${studyId}/lecture`);
    return response.data.map((lecture: any) => Lecture.fromJson(lecture));
  },

  GET_STUDY_ANNOUNCEMENTS: async (studyId: string): Promise<PageableModel<Announcement>> => {
    const response = await apiClient.get(`/studies/${studyId}/announcements`);
    return PageableModel.fromJson(response.data, Announcement);
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

  DELETE_LECTURE: async (studyId: number, announcementId: number): Promise<void> => {
    try {
      await apiClient.delete(`/studies/${studyId}/instructor/announcements/${announcementId}`);
    } catch (error) {
      console.error('[STUDY API] DELETE_LECTURE 에러:', error);
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
};

export type { CreateStudyRequest } from '../types/request/create-study-request';
export type { UpdateStudyRequest } from '../types/request/update-study-request';
export type { StudyQueryParams } from '../types/request/study-query-params';
