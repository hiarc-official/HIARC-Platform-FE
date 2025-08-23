import { PageableModel, Announcement, AnnouncementSummary } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { UpdateAnnouncementRequest } from '../types/request/update-announcement-request';
import { AnnouncementQueryParams } from '../types/request/announcement-query-params';

export const announcementApi = {
  // 공지사항 목록 조회 (페이지네이션)
  GET_ANNOUNCEMENTS: async (
    params: AnnouncementQueryParams = {}
  ): Promise<PageableModel<AnnouncementSummary>> => {
    const response = await apiClient.get<PageableModel<AnnouncementSummary>>('/announcements', {
      params,
    });
    return PageableModel.fromJson(response.data, AnnouncementSummary);
  },

  // 공지사항 상세 조회
  GET_ANNOUNCEMENT: async (id: string): Promise<Announcement> => {
    const response = await apiClient.get(`/announcements/${id}`);
    return Announcement.fromJson(response.data);
  },

  // 공지사항 생성
  CREATE_ANNOUNCEMENT: async (
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.post('/announcements', announcementData);
    return Announcement.fromJson(response.data);
  },

  // 공지사항 수정
  UPDATE_ANNOUNCEMENT: async (
    id: string,
    announcementData: UpdateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.put(`/announcements/${id}`, announcementData);
    return Announcement.fromJson(response.data);
  },

  // 공지사항 삭제
  DELETE_ANNOUNCEMENT: async (id: string): Promise<void> => {
    await apiClient.delete(`/announcements/${id}`);
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

  UPDATE_INSTRUCTOR_ANNOUNCEMENT: async (
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
