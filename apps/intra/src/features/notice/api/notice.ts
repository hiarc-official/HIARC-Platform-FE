import { apiClient } from '../../../shared/api/client';

import { Notice } from '../types/model/notice';
import { CreateNoticeRequest } from '../types/request/create-notice-request';
import { UpdateNoticeRequest } from '../types/request/update-notice-request';
import { NoticeQueryParams } from '../types/request/notice-query-params';
import { PageableModel } from '@/shared/types/pageable-model';
import { NoticeSummary } from '../types/notice-summary';

// Notice API 함수들
export const noticeApi = {
  // 공지사항 목록 조회 (페이지네이션)
  GET_NOTICES: async (params: NoticeQueryParams = {}): Promise<PageableModel<NoticeSummary>> => {
    const response = await apiClient.get('/notices', { params });
    return PageableModel.create<NoticeSummary>(response.data, NoticeSummary);
  },

  // 공지사항 상세 조회
  GET_NOTICE: async (id: string): Promise<Notice> => {
    const response = await apiClient.get(`/notices/${id}`);
    return Notice.fromJson(response.data);
  },

  // 공지사항 생성
  CREATE_NOTICE: async (noticeData: CreateNoticeRequest): Promise<Notice> => {
    const response = await apiClient.post('/notices', noticeData);
    return Notice.fromJson(response.data);
  },

  // 공지사항 수정
  UPDATE_NOTICE: async (id: string, noticeData: UpdateNoticeRequest): Promise<Notice> => {
    const response = await apiClient.put(`/notices/${id}`, noticeData);
    return Notice.fromJson(response.data);
  },

  // 공지사항 삭제
  DELETE_NOTICE: async (id: string): Promise<void> => {
    await apiClient.delete(`/notices/${id}`);
  },
};

// 타입들을 다시 export
export type { CreateNoticeRequest } from '../types/request/create-notice-request';
export type { UpdateNoticeRequest } from '../types/request/update-notice-request';
export type { NoticeQueryParams } from '../types/request/notice-query-params';
