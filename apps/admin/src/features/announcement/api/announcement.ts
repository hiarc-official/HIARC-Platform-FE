import { Announcement, CreateAnnouncementRequest, PageableModel } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

import { AnnouncementQueryParams } from '../types/request/announcement-query-params';
import { UploadResponse } from '../types/response/upload-response';
import { AnnouncementSummary } from '../types/model/announcement_summary';

export const announcementApi = {
  // 관리자 공지사항 목록 조회 (페이지네이션)
  GET_ADMIN_ANNOUNCEMENTS: async (
    params: AnnouncementQueryParams = {}
  ): Promise<PageableModel<AnnouncementSummary>> => {
    const response = await apiClient.get<PageableModel<AnnouncementSummary>>(
      '/admin/announcements',
      {
        params,
      }
    );
    return PageableModel.fromJson(response.data, AnnouncementSummary);
  },

  // 관리자 공지사항 상세 조회
  GET_ADMIN_ANNOUNCEMENT: async (id: number) => {
    console.log('[ADMIN ANNOUNCEMENT API] GET_ADMIN_ANNOUNCEMENT 요청:', id);
    try {
      const response = await apiClient.get(`/admin/announcements/${id}`);
      console.log('[ADMIN ANNOUNCEMENT API] GET_ADMIN_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] GET_ADMIN_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 관리자 공지사항 생성
  CREATE_ADMIN_ANNOUNCEMENT: async (
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.post('/admin/announcements', announcementData);

    return Announcement.fromJson(response.data);
  },

  // 관리자 공지사항 수정
  UPDATE_ADMIN_ANNOUNCEMENT: async (
    id: number,
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 요청:', {
      id,
      data: announcementData,
    });
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}`, announcementData);
      console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 관리자 공지사항 삭제
  DELETE_ADMIN_ANNOUNCEMENT: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/announcements/${id}`);
  },

  // 관리자 공지사항 게시/숨김 상태 변경
  UPDATE_ADMIN_ANNOUNCEMENT_STATUS: async (
    id: string,
    isPublished: boolean
  ): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_STATUS 요청:', {
      id,
      isPublished,
    });
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}/status`, { isPublished });
      console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_STATUS 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_STATUS 에러:', error);
      throw error;
    }
  },

  // 관리자 공지사항 중요도 변경
  UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE: async (
    id: string,
    isImportant: boolean
  ): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 요청:', {
      id,
      isImportant,
    });
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}/importance`, {
        isImportant,
      });
      console.log(
        '[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 응답:',
        response.data
      );
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 에러:', error);
      throw error;
    }
  },

  // 이미지 업로드를 위한 presigned URL 가져오기
  GET_IMAGE_UPLOAD_URL: async (contentType: string): Promise<UploadResponse> => {
    console.log('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 요청:', { contentType });
    try {
      const response = await apiClient.get<UploadResponse>(
        `/admin/announcements/image/upload-url?contentType=${encodeURIComponent(contentType)}`
      );
      console.log('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 에러:', error);
      throw error;
    }
  },
};
