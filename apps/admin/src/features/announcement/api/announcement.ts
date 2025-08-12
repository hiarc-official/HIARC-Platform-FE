import { PageableModel } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';
import { Announcement } from '../types/model/announcement';
import { CreateAnnouncementRequest } from '../types/request/create-announcement-request';
import { UpdateAnnouncementRequest } from '../types/request/update-announcement-request';
import { AnnouncementQueryParams } from '../types/request/announcement-query-params';

export const announcementApi = {
  // 관리자 공지사항 목록 조회 (페이지네이션)
  GET_ADMIN_ANNOUNCEMENTS: async (
    params: AnnouncementQueryParams = {}
  ): Promise<PageableModel<Announcement>> => {
    console.log('[ADMIN ANNOUNCEMENT API] GET_ADMIN_ANNOUNCEMENTS 요청:', params);
    try {
      const response = await apiClient.get<PageableModel<Announcement>>('/admin/announcements', {
        params,
      });
      console.log('[ADMIN ANNOUNCEMENT API] GET_ADMIN_ANNOUNCEMENTS 응답:', response.data);
      return PageableModel.fromJson(response.data, Announcement);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] GET_ADMIN_ANNOUNCEMENTS 에러:', error);
      throw error;
    }
  },

  // 관리자 공지사항 상세 조회
  GET_ADMIN_ANNOUNCEMENT: async (id: string): Promise<Announcement> => {
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
    console.log('[ADMIN ANNOUNCEMENT API] CREATE_ADMIN_ANNOUNCEMENT 요청:', announcementData);
    try {
      const response = await apiClient.post('/admin/announcements', announcementData);
      console.log('[ADMIN ANNOUNCEMENT API] CREATE_ADMIN_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] CREATE_ADMIN_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 관리자 공지사항 수정
  UPDATE_ADMIN_ANNOUNCEMENT: async (
    id: string,
    announcementData: UpdateAnnouncementRequest
  ): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 요청:', { id, data: announcementData });
    try {
      const response = await apiClient.put(`/admin/announcements/${id}`, announcementData);
      console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 관리자 공지사항 삭제
  DELETE_ADMIN_ANNOUNCEMENT: async (id: string): Promise<void> => {
    console.log('[ADMIN ANNOUNCEMENT API] DELETE_ADMIN_ANNOUNCEMENT 요청:', id);
    try {
      await apiClient.delete(`/admin/announcements/${id}`);
      console.log('[ADMIN ANNOUNCEMENT API] DELETE_ADMIN_ANNOUNCEMENT 성공');
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] DELETE_ADMIN_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 관리자 공지사항 게시/숨김 상태 변경
  UPDATE_ADMIN_ANNOUNCEMENT_STATUS: async (id: string, isPublished: boolean): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_STATUS 요청:', { id, isPublished });
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
  UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE: async (id: string, isImportant: boolean): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 요청:', { id, isImportant });
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}/importance`, { isImportant });
      console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 에러:', error);
      throw error;
    }
  },
};