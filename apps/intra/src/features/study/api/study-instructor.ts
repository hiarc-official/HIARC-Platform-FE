import { apiClient } from '../../../shared/api/client';
import { UpdateStudyRequest } from '../types/request/update-study-request';
import { StudyQueryParams } from '../types/request/study-query-params';
import {
  Announcement,
  Assignment,
  CreateAnnouncementRequest,
  CreateAssignmentRequest,
  PageableModel,
  Study,
  StudyInitialForm,
  StudyMember,
  StudySummary,
} from '@hiarc-platform/shared';
import { UpdateAnnouncementRequest } from '@/features/announcement/types/request/update-announcement-request';

export const studyInstructorApi = {
  GET_ALL_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    const response = await apiClient.get<PageableModel<StudySummary>>('/admin/studies', {
      params,
    });
    return PageableModel.fromJson(response.data, StudySummary);
  },

  UPDATE_STUDY: async (studyId: number, studyData: UpdateStudyRequest): Promise<void> => {
    await apiClient.patch<Study>(`/admin/studies/${studyId}`, studyData);
  },

  GET_STUDY_MEMBERS: async (studyId: number): Promise<StudyMember[]> => {
    const response = await apiClient.get(`/studies/${studyId}/instructor/status`);
    return response.data.map((member: unknown) => StudyMember.fromJson(member));
  },

  CREATE_ASSIGNMENT: async (
    studyId: number,
    lectureId: number,
    data: CreateAssignmentRequest
  ): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/assignment`, data);
  },

  GET_ASSIGNMENT: async (studyId: number, lectureId: number): Promise<Assignment> => {
    const response = await apiClient.get(`/studies/${studyId}/lecture/${lectureId}/assignment`);
    return Assignment.fromJson(response.data);
  },

  CREATE_ATTENDANCE_CODE: async (
    studyId: number,
    lectureId: number,
    code: string
  ): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/attendance`, {
      code,
    });
  },

  GET_ATTENDANCE_CODE: async (studyId: number, lectureId: number): Promise<string> => {
    const response = await apiClient.get(
      `/studies/${studyId}/instructor/lecture/${lectureId}/attendance`
    );
    return response.data.code;
  },

  DELETE_LECTURE: async (studyId: number, announcementId: number): Promise<void> => {
    await apiClient.delete(`/studies/${studyId}/instructor/announcements/${announcementId}`);
  },

  GET_STUDY_INITIAL_FORM: async (studyId: number): Promise<StudyInitialForm> => {
    const response = await apiClient.get<Study>(`/admin/studies/${studyId}`);
    return StudyInitialForm.fromJson(response.data);
  },

  CHECK_ATTENDANCE_CODE: async (
    studyId: number,
    lectureRound: number,
    attendanceCode: string
  ): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/lecture/${lectureRound}/attendance-code`, {
      code: attendanceCode,
    });
  },

  CREATE_STUDY_ANNOUNCEMENT: async (
    studyId: number,
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.post(
      `/studies/${studyId}/instructor/announcements`,
      announcementData
    );
    return Announcement.fromJson(response.data);
  },

  UPDATE_STUDY_ANNOUNCEMENT: async (
    studyId: number,
    announcementId: number,
    announcementData: UpdateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.patch(
      `/studies/${studyId}/instructor/announcements/${announcementId}`,
      announcementData
    );
    return Announcement.fromJson(response.data);
  },
};

export type { CreateStudyRequest } from '../types/request/create-study-request';
export type { UpdateStudyRequest } from '../types/request/update-study-request';
