import { apiClient } from '../../../shared/api/client';
import { Announcement } from '../types/model/announcement';
import { PageableModel } from '@/shared/types/pageable-model';
import type { 
  AnnouncementResponse, 
  AnnouncementListResponse,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
  AnnouncementQueryParams
} from '../types/announcement';

export const announcementApi = {
  // 공지사항 목록 조회 (페이지네이션)
  GET_ANNOUNCEMENTS: async (params: AnnouncementQueryParams = {}): Promise<AnnouncementListResponse> => {
    console.log('[ANNOUNCEMENT API] GET_ANNOUNCEMENTS 요청:', params);
    try {
      const response = await apiClient.get<AnnouncementListResponse>('/announcements', { params });
      console.log('[ANNOUNCEMENT API] GET_ANNOUNCEMENTS 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[ANNOUNCEMENT API] GET_ANNOUNCEMENTS 에러:', error);
      throw error;
    }
  },

  // 공지사항 상세 조회
  GET_ANNOUNCEMENT: async (id: string): Promise<Announcement> => {
    console.log('[ANNOUNCEMENT API] GET_ANNOUNCEMENT 요청:', id);
    try {
      const response = await apiClient.get(`/announcements/${id}`);
      console.log('[ANNOUNCEMENT API] GET_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ANNOUNCEMENT API] GET_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 공지사항 생성
  CREATE_ANNOUNCEMENT: async (announcementData: CreateAnnouncementRequest): Promise<Announcement> => {
    console.log('[ANNOUNCEMENT API] CREATE_ANNOUNCEMENT 요청:', announcementData);
    try {
      const response = await apiClient.post('/announcements', announcementData);
      console.log('[ANNOUNCEMENT API] CREATE_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ANNOUNCEMENT API] CREATE_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 공지사항 수정
  UPDATE_ANNOUNCEMENT: async (id: string, announcementData: UpdateAnnouncementRequest): Promise<Announcement> => {
    console.log('[ANNOUNCEMENT API] UPDATE_ANNOUNCEMENT 요청:', { id, data: announcementData });
    try {
      const response = await apiClient.put(`/announcements/${id}`, announcementData);
      console.log('[ANNOUNCEMENT API] UPDATE_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ANNOUNCEMENT API] UPDATE_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  // 공지사항 삭제
  DELETE_ANNOUNCEMENT: async (id: string): Promise<void> => {
    console.log('[ANNOUNCEMENT API] DELETE_ANNOUNCEMENT 요청:', id);
    try {
      await apiClient.delete(`/announcements/${id}`);
      console.log('[ANNOUNCEMENT API] DELETE_ANNOUNCEMENT 성공');
    } catch (error) {
      console.error('[ANNOUNCEMENT API] DELETE_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },
};

// 모든 타입을 announcement.ts에서 re-export
export type {
  AnnouncementResponse,
  AnnouncementListResponse,
  AnnouncementListItem,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
  AnnouncementQueryParams
} from '../types/announcement';
