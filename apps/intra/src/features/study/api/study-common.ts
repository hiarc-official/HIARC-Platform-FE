import { apiClient } from '../../../shared/api/client';
import { StudyQueryParams } from '../types/request/study-query-params';
import {
  AnnouncementSummary,
  Lecture,
  PageableModel,
  Study,
  StudySummary,
} from '@hiarc-platform/shared';

export const studyCommonApi = {
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

  // 스터디 신청하기
  APPLY_TO_STUDY: async (studyId: number): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/application`);
  },

  GET_LECTURES: async (studyId: number): Promise<Lecture[]> => {
    const response = await apiClient.get(`/studies/${studyId}/lecture`);
    return response.data.map((lecture: unknown) => Lecture.fromJson(lecture));
  },

  GET_STUDY_ANNOUNCEMENTS: async (
    studyId: number,
    page: number = 0,
    size: number = 10
  ): Promise<PageableModel<AnnouncementSummary>> => {
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
  },
};

export type { StudyQueryParams } from '../types/request/study-query-params';
